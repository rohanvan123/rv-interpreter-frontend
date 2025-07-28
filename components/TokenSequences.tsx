import { CodeResponse } from "@/lib/types";
import { FC } from "react";

interface TokenSequencesProps {
  programResult: CodeResponse;
}

// const splitTokensIntoSeq = (tokens: string[]): string[][] => {
//   let res = [];
//   let curr = [];
//   for (let i = 0; i < tokens.length; i++) {
//     curr.push(tokens[i]);
//     if (tokens[i] === "SEMI") {
//       res.push(curr);
//       curr = [];
//     }
//   }
//   return res;
// };

const TokenSequences: FC<TokenSequencesProps> = ({ programResult }) => {
  return (
    <div className="flex flex-col gap-2 mt-[20px] ml-[20px]">
      {programResult.tokens.map((seq: string[], seq_idx: number) => {
        return (
          <div key={seq_idx} className="flex flex-row gap-2 flex-wrap">
            <span className="bg-green-500 p-[7px] rounded-[5px] hover:bg-green-800">
              LINE {seq_idx + 1}
            </span>
            {seq.map((tok: string, tok_idx: number) => (
              <span
                key={tok_idx}
                className="bg-slate-300 p-[7px] rounded-[5px] hover:bg-slate-500"
              >
                {tok}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default TokenSequences;
