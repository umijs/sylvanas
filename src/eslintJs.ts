import * as path from 'path';
import { CLIEngine, Linter } from 'eslint';
import sylvanas from './index';

function eslintJS(jsFiles: sylvanas.FileEntity[]) {
  const engine = new CLIEngine({
    baseConfig: require(path.resolve(__dirname, '../.eslintrc.js')),
  });
  const rules = engine.getRules();
  const linter = new Linter();

  const lintFiles: sylvanas.FileEntity[] = jsFiles.map((entity: sylvanas.FileEntity) => {
    const { output } = linter.verifyAndFix(entity.data, {
      rules: rules as any,
    });

    return {
      ...entity,
      data: output,
    };
  });

  return lintFiles;
}

export default eslintJS;