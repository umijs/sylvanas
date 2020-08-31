const ts2js = require('../lib/ts2js').default;

function parse(text, option) {
  const parsed = ts2js([{ data: text.trim() }], option)[0].data;
  return parsed;
}

describe('Nullish', () => {
  it('work', () => {
    const source = `
interface Config {
  light?: number;
}
function my(config: Config) {
  return config.light ?? 2333;
}
`.trim();
    const text = parse(source);
    const cells = text.split(/[\r\n]+/).map((line) => line.trim());
    expect(cells).toEqual(['function my(config) {', 'return config.light ?? 2333;', '}']);
  });
});
