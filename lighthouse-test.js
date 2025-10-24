/**
 * Lighthouse Performance Test Script
 * OSO Camping BBQ - Production Site Analysis
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port
  };

  const runnerResult = await lighthouse(url, options);

  await chrome.kill();

  // Save full report
  const reportJson = JSON.stringify(runnerResult.lhr, null, 2);
  fs.writeFileSync('lighthouse-report-latest.json', reportJson);

  // Extract key metrics
  const metrics = {
    url: runnerResult.lhr.finalUrl,
    timestamp: runnerResult.lhr.fetchTime,
    scores: {
      performance: runnerResult.lhr.categories.performance.score * 100,
      accessibility: runnerResult.lhr.categories.accessibility.score * 100,
      bestPractices: runnerResult.lhr.categories['best-practices'].score * 100,
      seo: runnerResult.lhr.categories.seo.score * 100,
    },
    metrics: {
      FCP: runnerResult.lhr.audits['first-contentful-paint'].displayValue,
      LCP: runnerResult.lhr.audits['largest-contentful-paint'].displayValue,
      TBT: runnerResult.lhr.audits['total-blocking-time'].displayValue,
      CLS: runnerResult.lhr.audits['cumulative-layout-shift'].displayValue,
      SI: runnerResult.lhr.audits['speed-index'].displayValue,
    },
    opportunities: runnerResult.lhr.audits['uses-optimized-images'] ? {
      optimizedImages: runnerResult.lhr.audits['uses-optimized-images'].details?.overallSavingsMs || 0,
      unusedCSS: runnerResult.lhr.audits['unused-css-rules']?.details?.overallSavingsMs || 0,
      unusedJavaScript: runnerResult.lhr.audits['unused-javascript']?.details?.overallSavingsMs || 0,
    } : {}
  };

  console.log('\n=== Lighthouse Performance Report ===\n');
  console.log('URL:', metrics.url);
  console.log('Date:', new Date(metrics.timestamp).toLocaleString());
  console.log('\n--- Scores ---');
  console.log(`Performance:    ${metrics.scores.performance.toFixed(0)}/100`);
  console.log(`Accessibility:  ${metrics.scores.accessibility.toFixed(0)}/100`);
  console.log(`Best Practices: ${metrics.scores.bestPractices.toFixed(0)}/100`);
  console.log(`SEO:            ${metrics.scores.seo.toFixed(0)}/100`);
  console.log('\n--- Core Web Vitals ---');
  console.log(`FCP (First Contentful Paint):    ${metrics.metrics.FCP}`);
  console.log(`LCP (Largest Contentful Paint):  ${metrics.metrics.LCP}`);
  console.log(`TBT (Total Blocking Time):       ${metrics.metrics.TBT}`);
  console.log(`CLS (Cumulative Layout Shift):   ${metrics.metrics.CLS}`);
  console.log(`SI (Speed Index):                ${metrics.metrics.SI}`);
  console.log('\n--- Optimization Opportunities ---');
  if (metrics.opportunities.optimizedImages) {
    console.log(`Optimized Images:     ${metrics.opportunities.optimizedImages}ms savings`);
  }
  if (metrics.opportunities.unusedCSS) {
    console.log(`Remove Unused CSS:    ${metrics.opportunities.unusedCSS}ms savings`);
  }
  if (metrics.opportunities.unusedJavaScript) {
    console.log(`Remove Unused JS:     ${metrics.opportunities.unusedJavaScript}ms savings`);
  }
  console.log('\n=== Full report saved to lighthouse-report-latest.json ===\n');

  return metrics;
}

// Run test on production URL
const productionUrl = 'https://oso-v03.vercel.app';
runLighthouse(productionUrl)
  .then(() => console.log('Lighthouse test completed!'))
  .catch(err => console.error('Error running Lighthouse:', err));
