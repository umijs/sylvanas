export type Action = 'none' | 'write' | 'overwrite';

export interface BabelOption {
  decoratorsBeforeExport?: boolean;
  filename?: string;
}

export interface Option extends BabelOption {
  outDir?: string;
  cwd?: string;
  action?: Action;
}

export interface FileEntity {
  sourceFilePath: string;
  targetFilePath?: string;
  data: string;
}
