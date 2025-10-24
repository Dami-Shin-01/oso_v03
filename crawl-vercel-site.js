const { chromium } = require('playwright');
const fs = require('fs');

async function crawlSite() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const targetUrl = 'https://oso-v03.vercel.app';
  const visitedUrls = new Set();
  const allLinks = [];
  const brokenLinks = [];
  const images = [];

  console.log(`Starting crawl of ${targetUrl}...`);

  // Enable request/response logging
  page.on('response', async (response) => {
    const url = response.url();
    const status = response.status();

    if (status >= 400) {
      console.log(`[${status}] ${url}`);
    }
  });

  async function checkUrl(url) {
    try {
      const response = await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      });
      return response ? response.status() : null;
    } catch (error) {
      console.error(`Error visiting ${url}: ${error.message}`);
      return null;
    }
  }

  async function extractLinks(currentUrl) {
    try {
      // Extract all links
      const links = await page.$$eval('a[href]', (anchors, baseUrl) => {
        return anchors.map(a => {
          const href = a.getAttribute('href');
          try {
            // Handle relative URLs
            if (href.startsWith('/')) {
              return new URL(href, baseUrl).href;
            } else if (href.startsWith('http')) {
              return href;
            } else if (!href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
              return new URL(href, baseUrl).href;
            }
            return href;
          } catch (e) {
            return href;
          }
        }).filter(href => href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:'));
      }, currentUrl);

      // Extract all images
      const imgs = await page.$$eval('img[src]', (images, baseUrl) => {
        return images.map(img => {
          const src = img.getAttribute('src');
          try {
            if (src.startsWith('/')) {
              return new URL(src, baseUrl).href;
            } else if (src.startsWith('http')) {
              return src;
            } else {
              return new URL(src, baseUrl).href;
            }
          } catch (e) {
            return src;
          }
        }).filter(src => src && !src.startsWith('data:'));
      }, currentUrl);

      return { links, imgs };
    } catch (error) {
      console.error(`Error extracting links from ${currentUrl}: ${error.message}`);
      return { links: [], imgs: [] };
    }
  }

  // Start with the main page
  console.log(`\nVisiting main page: ${targetUrl}`);
  const mainStatus = await checkUrl(targetUrl);
  visitedUrls.add(targetUrl);

  allLinks.push({
    url: targetUrl,
    status: mainStatus,
    isInternal: true,
    type: 'page'
  });

  const { links: mainLinks, imgs: mainImages } = await extractLinks(targetUrl);

  console.log(`\nFound ${mainLinks.length} links and ${mainImages.length} images on main page`);

  // Process all links found on main page
  for (const link of mainLinks) {
    if (visitedUrls.has(link)) continue;

    const isInternal = link.startsWith(targetUrl);
    console.log(`\nChecking link: ${link}`);

    let status = null;
    let errorMessage = null;

    try {
      // Check if it's an internal page
      if (isInternal) {
        status = await checkUrl(link);
        visitedUrls.add(link);

        // If successful, extract links from this page too
        if (status && status < 400) {
          const { links: subLinks } = await extractLinks(link);
          // Add newly discovered links to the list
          for (const subLink of subLinks) {
            if (!mainLinks.includes(subLink) && !allLinks.some(l => l.url === subLink)) {
              mainLinks.push(subLink);
            }
          }
        }
      } else {
        // For external links, make a simple HEAD request
        try {
          const response = await fetch(link, { method: 'HEAD', timeout: 10000 });
          status = response.status;
        } catch (e) {
          errorMessage = e.message;
          status = 0;
        }
      }
    } catch (error) {
      errorMessage = error.message;
      console.error(`Error checking ${link}: ${error.message}`);
    }

    allLinks.push({
      url: link,
      status: status,
      isInternal: isInternal,
      type: 'link',
      error: errorMessage
    });

    if (status && status >= 400) {
      const relativePath = link.replace(targetUrl, '');
      brokenLinks.push({
        url: link,
        status: status,
        relativePath: relativePath,
        isInternal: isInternal
      });
    }
  }

  // Check all images
  console.log(`\nChecking ${mainImages.length} images...`);
  for (const img of mainImages) {
    console.log(`Checking image: ${img}`);
    let status = null;

    try {
      const response = await fetch(img, { method: 'HEAD', timeout: 10000 });
      status = response.status;
    } catch (e) {
      status = 0;
    }

    images.push({
      url: img,
      status: status,
      isInternal: img.startsWith(targetUrl)
    });

    if (status >= 400) {
      brokenLinks.push({
        url: img,
        status: status,
        relativePath: img.replace(targetUrl, ''),
        isInternal: img.startsWith(targetUrl),
        type: 'image'
      });
    }
  }

  // Analyze patterns
  const patterns = [];
  const staticHtmlFiles = brokenLinks.filter(link =>
    link.relativePath && link.relativePath.endsWith('.html')
  );

  if (staticHtmlFiles.length > 0) {
    patterns.push('Static HTML files (.html) causing 404 errors');
  }

  const externalOriginalSite = allLinks.filter(link =>
    link.url && link.url.includes('humantown.co.kr')
  );

  if (externalOriginalSite.length > 0) {
    patterns.push('Links to original site (humantown.co.kr) found');
  }

  const absoluteVsRelative = {
    absolute: brokenLinks.filter(l => l.relativePath && l.relativePath.startsWith('/')).length,
    relative: brokenLinks.filter(l => l.relativePath && !l.relativePath.startsWith('/')).length
  };

  if (absoluteVsRelative.absolute > 0 || absoluteVsRelative.relative > 0) {
    patterns.push(`Path type issues: ${absoluteVsRelative.absolute} absolute, ${absoluteVsRelative.relative} relative`);
  }

  // Generate recommendations
  const recommendations = [];

  if (staticHtmlFiles.length > 0) {
    recommendations.push('Convert static .html file routes to Next.js dynamic routes (e.g., /special2.html -> /special2 or create special2.html in public folder)');
    recommendations.push('Static HTML files found: ' + staticHtmlFiles.map(f => f.relativePath).join(', '));
  }

  if (externalOriginalSite.length > 0) {
    recommendations.push('Update links pointing to humantown.co.kr to point to the new Vercel domain');
  }

  if (brokenLinks.some(l => l.relativePath && l.relativePath.includes('/images/'))) {
    recommendations.push('Check if images are properly placed in the public/images directory');
  }

  const result = {
    crawl_summary: `Crawled ${visitedUrls.size} pages, found ${allLinks.length} total links and ${images.length} images`,
    target_url: targetUrl,
    total_links: allLinks.length,
    total_images: images.length,
    broken_links_count: brokenLinks.length,
    broken_links: brokenLinks.map(link => ({
      url: link.url,
      status: link.status,
      relative_path: link.relativePath,
      is_internal: link.isInternal,
      type: link.type || 'link',
      expected_nextjs_route: link.relativePath ? link.relativePath.replace('.html', '') : null,
      pattern: link.relativePath && link.relativePath.endsWith('.html') ? 'Static HTML file' :
               link.url.includes('humantown.co.kr') ? 'External original site link' : 'Other'
    })),
    all_links: allLinks,
    all_images: images,
    external_original_site_links: externalOriginalSite,
    patterns: patterns,
    recommendations: recommendations,
    static_html_files: staticHtmlFiles.map(f => f.relativePath)
  };

  // Save to file
  fs.writeFileSync('crawl-results.json', JSON.stringify(result, null, 2));
  console.log('\n\n=== CRAWL COMPLETE ===');
  console.log(`Total links checked: ${allLinks.length}`);
  console.log(`Total images checked: ${images.length}`);
  console.log(`Broken links found: ${brokenLinks.length}`);
  console.log('\nResults saved to crawl-results.json');

  await browser.close();
  return result;
}

crawlSite().catch(console.error);
