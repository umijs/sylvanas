const ts2js = require('../lib/ts2js').default;

function parse(text, option) {
  const parsed = ts2js([{ data: text.trim() }], option)[0].data;
  return parsed;
}

describe('import', () => {
  it('React', () => {
    const text = parse(
      `
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
`,
    );
    expect(text.includes('React.lazy')).toBeTruthy();
    expect(text.includes("import('./OtherComponent')")).toBeTruthy();
  });
});
