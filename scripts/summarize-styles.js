const fs = require('fs');

const data = JSON.parse(fs.readFileSync('extracted-styles.json', 'utf8'));

const summary = {
  cssFiles: data.cssFiles,
  cssFileCount: data.cssFiles.length,
  inlineStylesCount: data.inlineStyles.length,
  colors: data.colors,
  fonts: data.fonts,
  fontSizes: data.fontSizes,
  buttons: data.buttons,
  computedStyles: data.computedStyles,
  cssFileSizes: data.cssFileContents.map(f => ({
    url: f.url,
    size: f.size,
    hasContent: !!f.content
  }))
};

console.log(JSON.stringify(summary, null, 2));
fs.writeFileSync('styles-summary.json', JSON.stringify(summary, null, 2));
console.log('\n요약 파일 저장 완료: styles-summary.json');
