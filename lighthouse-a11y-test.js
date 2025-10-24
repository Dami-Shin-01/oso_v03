const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless', '--disable-gpu'] });

  try {
    const options = {
      logLevel: 'info',
      output: 'json',
      port: chrome.port,
      onlyCategories: ['accessibility', 'best-practices', 'seo'],
    };

    const runnerResult = await lighthouse(url, options);
    const report = JSON.parse(runnerResult.report);

    console.log('\n=== LIGHTHOUSE AUDIT RESULTS ===\n');
    console.log('URL: ' + url);
    console.log('Accessibility Score: ' + Math.round(report.categories.accessibility.score * 100));
    console.log('Best Practices Score: ' + Math.round(report.categories['best-practices'].score * 100));
    console.log('SEO Score: ' + Math.round(report.categories.seo.score * 100));

    // Show accessibility audit details
    console.log('\n=== ACCESSIBILITY AUDIT DETAILS ===\n');
    const a11yAudits = report.categories.accessibility.auditRefs;

    a11yAudits.forEach(function(auditRef) {
      const audit = report.audits[auditRef.id];
      if (audit && audit.score !== null) {
        const status = audit.score === 1 ? 'PASS' : 'FAIL';
        console.log(status + ' ' + audit.title + ': ' + Math.round(audit.score * 100));
      }
    });

    fs.writeFileSync(
      'C:\\Users\\eansa\\OneDrive\\문서\\lighthouse-a11y-report.json',
      JSON.stringify(report, null, 2)
    );
    console.log('\nFull report saved to lighthouse-a11y-report.json');

  } finally {
    await chrome.kill();
  }
}

runLighthouse('https://oso-v03.vercel.app').catch(function(err) {
  console.error('Lighthouse Error:', err);
  process.exit(1);
});
