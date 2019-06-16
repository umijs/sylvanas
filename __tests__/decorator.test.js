const ts2js = require('../lib/ts2js').default;

function parse(text, option) {
  const parsed = ts2js([{ data: text.trim() }], option)[0].data;
  return parsed;
}

describe('decorator', () => {
  it('class', () => {
    const text = parse(
      `
// With Class
@withClass
class A {}

@withClassVar('Light')
class B {}
`,
    );
    expect(text.includes('@withClass')).toBeTruthy();
    expect(text.includes("@withClassVar('Light')")).toBeTruthy();
  });

  it('before class', () => {
    const text = parse(
      `
// With Class
@withClass class A {}

@withClassVar('Light') class B {}
`,
    );
    expect(text.includes('@withClass')).toBeTruthy();
    expect(text.includes("@withClassVar('Light')")).toBeTruthy();
  });

  it('class props', () => {
    const text = parse(
      `
// With Class Props
class A {
@withProp
prop1 = 'Bamboo';

@withPropVar('Light')
prop2 = 'Bamboo';

@withFunc
func1() {}

@withFuncVar('Light')
func2() {}
}
`,
    );

    expect(text.includes('@withProp')).toBeTruthy();
    expect(text.includes("@withPropVar('Light')")).toBeTruthy();
    expect(text.includes('@withFunc')).toBeTruthy();
    expect(text.includes("@withFuncVar('Light')")).toBeTruthy();
  });

  describe('before export', () => {
    it('true', () => {
      const text = parse(
        `
@decorator
export class Foo {}
`,
        {
          decoratorsBeforeExport: true,
        },
      );

      expect(text.includes('@decorator')).toBeTruthy();
    });

    it('false', () => {
      const text = parse(
        `
export @decorator class Foo {}
`,
        {
          decoratorsBeforeExport: false,
        },
      );

      expect(text.includes('@decorator')).toBeTruthy();
    });
  });
});
