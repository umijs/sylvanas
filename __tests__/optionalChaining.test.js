const ts2js = require('../lib/ts2js').default;

function parse(text, option) {
  const parsed = ts2js([{ data: text.trim() }], option)[0].data;
  return parsed;
}

describe('optional chaining', () => {
  it('class', () => {
    const text = parse(
      `
function parse(unit?: { value: number }) {
  return unit?.value;
}
`,
    );
    // expect(text.includes('async')).toBeTruthy();
    console.log('>>>', text);
  });
});
