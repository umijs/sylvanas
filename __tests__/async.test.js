const ts2js = require('../lib/ts2js').default;

function parse(text, option) {
  const parsed = ts2js([{ data: text.trim() }], option)[0].data;
  return parsed;
}

describe('async', () => {
  it('class', () => {
    const text = parse(
      `
async function test() {
  const a = await 233;
}
`,
    );
    expect(text.includes('async')).toBeTruthy();
    expect(text.includes('await')).toBeTruthy();
  });
});
