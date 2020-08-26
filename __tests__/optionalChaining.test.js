const ts2js = require('../lib/ts2js').default;

function parse(text, option) {
  const parsed = ts2js([{ data: text.trim() }], option)[0].data;
  return parsed;
}

describe('optional chaining', () => {
  it('class', () => {
    const source = `
const getRowByKey = (key: string, newData?: TableFormDateType[]) => (newData || data)?.filter((item) => item.key === key)[0];
`.trim();
    const text = parse(source);
    expect(text).toEqual(
      `const getRowByKey = (key, newData) => (newData || data)?.filter(item => item.key === key)[0];`,
    );
  });
});
