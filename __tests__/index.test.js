const path = require('path');
const glob = require('glob');
const sylvanas = require('../lib/index');
const cwd = path.resolve(__dirname, 'suite');

describe('sylvanas', () => {
  const files = glob.sync('**/*.@(ts|tsx)', {
    cwd,
  });

  it('basic', () => {
    sylvanas(files, {
      cwd,
    });
  });
});
