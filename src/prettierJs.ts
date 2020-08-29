import * as path from 'path';
import * as fs from 'fs';
import { format, Options } from 'prettier';
import { FileEntity } from './typing';

function prettierJS(jsFiles: FileEntity[]): FileEntity[] {
  const str = fs.readFileSync(path.resolve(__dirname, '../.prettierrc'), 'utf8');
  const prettierOption: Options = JSON.parse(str);
  prettierOption.parser = 'babel';

  return jsFiles.map((entity) => {
    let { data } = entity;
    try {
      data = format(entity.data, prettierOption);
    } catch (e) {
      console.error('error', e);
    }
    return {
      ...entity,
      data,
    };
  });
}

export default prettierJS;
