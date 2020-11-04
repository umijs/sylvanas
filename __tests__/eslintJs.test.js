const fs = require('fs');
const path = require('path');
const { lintAndFix } = require('../lib/eslintJs');
const { parseText } = require('../lib/index');

describe('lintAndFix', () => {
  const content = fs.readFileSync(path.resolve(__dirname, 'suite/test.jsx'), 'utf-8');
  const fix = fs.readFileSync(path.resolve(__dirname, 'suite/fix.jsx'), 'utf-8');

  it('basic', () => {
    const fixContent = lintAndFix(content, 'index.jsx');
    expect(fixContent).toEqual(fix);
  });

  it('parseText', () => {
    const fixContent = parseText(content, {
      filename: 'index.jsx',
    });
    expect(fixContent).toEqual(fix);
  });

  it('parseText no filename', () => {
    const fixContent = parseText(content);
    expect(fixContent).not.toEqual(fix);
  });
});
