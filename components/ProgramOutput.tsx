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
    <div className="w-[60%] flex flex-row justify-center ">
      <div className="mt-[10px] w-[95%]">
        {/* <span className="text-[30px]">Interpreter Output</span> */}
        <div className="">
          <Container>
            <span className="font-semibold text-[20px]">Lexer Output</span>

            {loading ? (
              <LoadingIcon />
            ) : programResult ? (
              programResult.error !== undefined ? (
                <div className="text-red-600 p-3 mt-6 rounded bg-red-100">
                  Error: {programResult.error} (Check your code for syntax
                  errors)
                </div>
              ) : (
                <TokenSequences programResult={programResult} />
              )
            ) : (
              <div className="bg-slate-300 p-[7px] mt-[30px] rounded-[5px]">
                No Data
              </div>
            )}
          </Container>
          <Container>
            <span className="font-semibold text-[20px]">Parser Output</span>
            {loading ? (
              <LoadingIcon />
            ) : programResult ? (
              programResult.error !== undefined ? (
                <div className="text-red-600 p-3 mt-6 rounded bg-red-100">
                  Error: {programResult.error} (Check your code for syntax
                  errors)
                </div>
              ) : programResult.ast_trees &&
                programResult.ast_trees.length > 0 ? (
                <TreeSlider astTrees={programResult.ast_trees} />
              ) : (
                <div className="bg-slate-300 p-[7px] mt-[30px] rounded-[5px]">
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
    </div>
  );
};

export default ProgramOutput;
