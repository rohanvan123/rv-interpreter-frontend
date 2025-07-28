import { CodeResponse } from "@/lib/types";
import { FC } from "react";
import TokenSequences from "./TokenSequences";
import TreeSlider from "./TreeSlider";
import Container from "./Containter";
import LoadingIcon from "./LoadingIcon";

interface ProgramOutputProps {
  programResult: CodeResponse | undefined;
  loading: boolean;
}

const ProgramOutput: FC<ProgramOutputProps> = ({ programResult, loading }) => {
  // console.log(programResult);
  return (
    <div className="w-full flex flex-row">
      <div className="w-full mx-auto flex flex-col gap-[20px]">
        <Container>
          <span className="font-semibold text-[16px]">Lexer Output</span>

          {loading ? (
            <LoadingIcon />
          ) : programResult ? (
            programResult.error !== undefined ? (
              <div className="text-red-600 p-3 mt-6 first:mt-0 rounded bg-red-100">
                Error: {programResult.error} (Check your code for syntax errors)
              </div>
            ) : (
              <TokenSequences programResult={programResult} />
            )
          ) : (
            <div className="bg-slate-300 p-[7px] mt-[30px] first:mt-0 rounded-[5px]">
              No Data
            </div>
          )}
        </Container>
        <Container>
          <span className="font-semibold text-[16px]">Parser Output</span>
          {loading ? (
            <LoadingIcon />
          ) : programResult ? (
            programResult.error !== undefined ? (
              <div className="text-red-600 p-3 mt-6 rounded bg-red-100 first:mt-0">
                Error: {programResult.error} (Check your code for syntax errors)
              </div>
            ) : programResult.ast_trees &&
              programResult.ast_trees.length > 0 ? (
              <TreeSlider astTrees={programResult.ast_trees} />
            ) : (
              <div className="bg-slate-300 p-[7px] mt-[30px] rounded-[5px] first:mt-0">
                No Data
              </div>
            )
          ) : (
            <div className="bg-slate-300 p-[7px] mt-[30px] rounded-[5px]">
              No Data
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default ProgramOutput;
