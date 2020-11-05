import * as path from 'path';
import { CLIEngine } from 'eslint';
import { FileEntity } from './typing';

const importCache = require('import-fresh');

const engine = new CLIEngine({
  useEslintrc: false,
  fix: true,
  baseConfig: importCache(path.resolve(__dirname, '../.eslintrc.js')),
  resolvePluginsRelativeTo: path.resolve(__dirname, '..'),
});

export const lintAndFix: (content: string, filename?: string) => string = (content, filename) => {
  const report = engine.executeOnText(content, filename);

  if (report.results[0] && report.results[0].output) {
    return report.results[0].output;
  }
  return content;
};

function eslintJS(jsFiles: FileEntity[]) {
  const lintFiles: FileEntity[] = jsFiles.map((entity: FileEntity) => {
    let output: string = entity.data;
    try {
      output = lintAndFix(entity.data, entity.sourceFilePath);
    } catch (e) {
      console.error(e);
    }
    return {
      ...entity,
      data: output,
    };
  });

  return lintFiles;
}

export default eslintJS;
