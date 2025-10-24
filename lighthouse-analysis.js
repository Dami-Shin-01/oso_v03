const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

async function runLighthouse(url) {
  let chrome;
  try {
    console.log('🚀 Starting Lighthouse Analysis...\n');
    console.log(`URL: ${url}\n`);

    chrome = await chromeLauncher.launch({ chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox'] });

    const options = {
      logLevel: 'error',
      output: 'json',
      port: chrome.port,
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    };

    const runnerResult = await lighthouse(url, options);
    const report = JSON.parse(runnerResult.report);

    // Display results
    console.log('═══════════════════════════════════════════════════════════════\n');
    console.log('📊 LIGHTHOUSE AUDIT RESULTS\n');
    console.log('═══════════════════════════════════════════════════════════════\n');

    const categories = report.categories;

    // Score summary
    console.log('📈 Overall Scores:');
    console.log(`  Performance:      ${Math.round(categories.performance.score * 100)}/100`);
    console.log(`  Accessibility:    ${Math.round(categories.accessibility.score * 100)}/100`);
    console.log(`  Best Practices:   ${Math.round(categories['best-practices'].score * 100)}/100`);
    console.log(`  SEO:              ${Math.round(categories.seo.score * 100)}/100\n`);

    // Web Vitals
    console.log('🎯 Web Vitals:');
    const metrics = report.audits['metrics'];
    if (metrics && metrics.details && metrics.details.items) {
      const item = metrics.details.items[0];
      console.log(`  LCP (Largest Contentful Paint): ${item.largestContentfulPaint || 'N/A'} ms`);
      console.log(`  FID (First Input Delay):        ${item.firstInputDelay || 'N/A'} ms`);
      console.log(`  CLS (Cumulative Layout Shift):  ${item.cumulativeLayoutShift || 'N/A'}`);
    }

    // Performance opportunities
    console.log('\n🔴 Performance Issues & Opportunities:\n');
    const opportunities = report.categories.performance.auditRefs.filter(ref => {
      const audit = report.audits[ref.id];
      return audit && audit.score !== 1 && audit.score !== null && audit.details;
    });

    opportunities.slice(0, 15).forEach((opRef, idx) => {
      const audit = report.audits[opRef.id];
      const scorePct = audit.score ? Math.round(audit.score * 100) : 0;
      console.log(`${idx + 1}. ${audit.title}`);
      console.log(`   Score: ${scorePct}%`);
      if (audit.description) {
        console.log(`   ${audit.description.substring(0, 80)}...`);
      }
      if (audit.details && audit.details.overallSavingsMs) {
        console.log(`   Potential Savings: ${audit.details.overallSavingsMs}ms`);
      }
      console.log();
    });

    // Detailed audit data
    console.log('\n📋 Detailed Audit Data:\n');

    // Unused CSS
    const unusedCSS = report.audits['unused-css-rules'];
    if (unusedCSS && unusedCSS.details && unusedCSS.details.items) {
      const totalBytes = unusedCSS.details.items.reduce((sum, item) => sum + (item.wastedBytes || 0), 0);
      console.log(`Unused CSS: ${(totalBytes / 1024).toFixed(2)} KB`);
      console.log(`  Items: ${unusedCSS.details.items.length}`);
    }

    // Unused JavaScript
    const unusedJS = report.audits['unused-javascript'];
    if (unusedJS && unusedJS.details && unusedJS.details.items) {
      const totalBytes = unusedJS.details.items.reduce((sum, item) => sum + (item.wastedBytes || 0), 0);
      console.log(`Unused JavaScript: ${(totalBytes / 1024).toFixed(2)} KB`);
      console.log(`  Items: ${unusedJS.details.items.length}`);
    }

    // Image optimization
    const imageOpt = report.audits['modern-image-formats'];
    if (imageOpt && imageOpt.details && imageOpt.details.items) {
      const totalBytes = imageOpt.details.items.reduce((sum, item) => sum + (item.wastedBytes || 0), 0);
      console.log(`Unoptimized Images: ${(totalBytes / 1024).toFixed(2)} KB`);
      console.log(`  Items: ${imageOpt.details.items.length}`);
    }

    // Network Round Trips
    const networkRoundTrips = report.audits['network-round-trip-times'];
    if (networkRoundTrips && networkRoundTrips.details && networkRoundTrips.details.items) {
      console.log(`Network Round Trips: ${networkRoundTrips.details.items.length}`);
    }

    // Main thread work
    const mainThread = report.audits['mainthread-work-breakdown'];
    if (mainThread && mainThread.details && mainThread.details.items) {
      console.log(`Main Thread Activities: ${mainThread.details.items.length}`);
      mainThread.details.items.slice(0, 5).forEach(item => {
        console.log(`  - ${item.group}: ${(item.duration).toFixed(0)}ms`);
      });
    }

    // Save detailed report
    const reportPath = path.join(process.cwd(), 'lighthouse-performance-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n✅ Full report saved to: lighthouse-performance-report.json`);

  } catch (error) {
    console.error('❌ Lighthouse Error:', error.message);
  } finally {
    if (chrome) {
      await chrome.kill();
    }
  }
}

runLighthouse('https://oso-v03.vercel.app');
