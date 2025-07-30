import CodeEditor from "@/components/CodeEditor";
import Container from "@/components/Containter";
import LoadingIcon from "@/components/LoadingIcon";
import NavBar from "@/components/NavBar";
import ProgramOutput from "@/components/ProgramOutput";
import { CodeResponse } from "@/lib/types";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<CodeResponse>();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <main className="w-full">
      <NavBar />
      <div className="flex flex-row mt-[80px]">
        <div className="flex flex-col w-[60%] gap-[20px] mx-auto">
          <CodeEditor
            setResult={setResult}
            setLoading={setLoading}
            loading={loading}
          />
          <div className="">
            <Container>
              <span className="font-semibold text-[16px]">
                Execution Output
              </span>

              {loading ? (
                <LoadingIcon />
              ) : result && result.error !== undefined ? (
                <div className="text-red-600 p-3 mt-6 rounded bg-red-100">
                  Error: {result.error} (Check your code for syntax errors)
                </div>
              ) : (
                <div className="bg-slate-300 p-[7px] mt-[30px] rounded-[5px]">
                  <div className="whitespace-pre-line break-all">
                    {result && Array.isArray(result.program_output)
                      ? result.program_output.map(
                          (line: string, idx: number) => (
                            <div key={idx}>{`>> ${line}`}</div>
                          )
                        )
                      : ">>"}
                  </div>
                </div>
              )}
            </Container>
          </div>
        </div>
        <ProgramOutput programResult={result} loading={loading} />
      </div>
    </main>
  );
}
