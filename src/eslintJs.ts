import * as path from 'path';
import { CLIEngine } from 'eslint';
import { FileEntity } from './typing';

const importCache = require('import-fresh');

const engine = new CLIEngine({
  useEslintrc: false,
  fix: true,
  baseConfig: importCache(path.resolve(__dirname, '../eslintrc.js')),
});

export const lintAndFix: (content: string) => string = content => {
  const report = engine.executeOnText(content);
  if (report.results[0].output) {
    return report.results[0].output;
  }
  return content;
};

function eslintJS(jsFiles: FileEntity[]) {
  const lintFiles: FileEntity[] = jsFiles.map((entity: FileEntity) => {
    const output: string = lintAndFix(entity.data);
    return {
      ...entity,
      data: output,
    };
  });

  return lintFiles;
}

export default eslintJS;
