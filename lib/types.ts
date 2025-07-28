export interface CodeResponse {
  tokens: string[][];
  program_output: string[];
  ast_trees: string[];
  error: number | undefined;
}
