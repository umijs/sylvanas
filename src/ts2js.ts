import * as ts from 'typescript';
import sylvanas from './index';

function ts2js(fileList: string[]) {
  const program = ts.createProgram(fileList, {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ESNext,
    lib: ['esnext', 'dom'],
    sourceMap: false,
    baseUrl: '.',
    jsx: ts.JsxEmit.React,
    allowSyntheticDefaultImports: true,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    forceConsistentCasingInFileNames: true,
    noImplicitReturns: true,
    suppressImplicitAnyIndexErrors: true,
    noUnusedLocals: true,
    experimentalDecorators: true,
    strict: true,
    paths: {
      '@/*': ['./src/*'],
    },
  });

  const list: sylvanas.FileEntity[] = [];

  program.emit(undefined, (targetFileName, data, _, __, sourceFiles) => {
    let sourceFileName: string = '';
    if (sourceFiles && sourceFiles[0]) {
      sourceFileName = sourceFiles[0].fileName;
    }

    list.push({
      sourceFileName,
      targetFileName,
      data,
    });
  });

  return list;
}

export default ts2js;
