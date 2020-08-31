import syntaxDecorators from '@babel/plugin-syntax-decorators';

export default () => {
  return {
    name: 'sylvanas-decorators',
    inherits: syntaxDecorators,
    visitor: {},
  };
};
