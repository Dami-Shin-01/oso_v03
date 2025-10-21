const fs = require('fs');

const data = JSON.parse(fs.readFileSync('extracted-styles.json', 'utf8'));

console.log('CSS 파일을 개별 파일로 저장 중...\n');

data.cssFileContents.forEach((cssFile, index) => {
  if (cssFile.content) {
    const urlParts = cssFile.url.split('/');
    const filename = urlParts[urlParts.length - 1].replace('.min.css', '.css');
    const outputPath = `css-${index + 1}-${filename}`;

    fs.writeFileSync(outputPath, cssFile.content, 'utf8');
    console.log(`${index + 1}. ${filename} (${cssFile.size} bytes) -> ${outputPath}`);
  } else {
    console.log(`${index + 1}. ${cssFile.url} - 다운로드 실패`);
  }
});

console.log('\n모든 CSS 파일 저장 완료!');
