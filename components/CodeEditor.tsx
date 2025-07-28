import { CodeResponse } from "@/lib/types";
import { Dispatch, FC, SetStateAction, useState } from "react";
import ReactLoading from "react-loading";
import Editor from "react-simple-code-editor";

const preProcessCode = (code: string) => {
  // const split_commands: string[] | undefined = code.trim().split(";");
  // split_commands.pop();
  // return split_commands ? split_commands?.map((item, idx) => item + ";") : [];

  return code.split("\n");
};

const parseData = (data: any) => {
  return {
    tokens: data.tokens,
    ast_trees: data.ast_sequence,
    program_output: data.progam_output,
    error: undefined,
  };
};

interface CodeEditorProps {
  setResult: Dispatch<SetStateAction<CodeResponse | undefined>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}

const CodeEditor: FC<CodeEditorProps> = ({
  setResult,
  setLoading,
  loading,
}) => {
  const [code, setCode] = useState<string>(
    `let x = 10;
if (x > 5) {
    print(true);
    print(true);
} else {
    print(false);
}`
  );

  const fetchData = async () => {
    const LOCAL_BACKEND_BASE = "http://127.0.0.1:5000";
    const PROD_BACKEND_BASE = "https://rv-interpreter.onrender.com";
    const res = await fetch(`${PROD_BACKEND_BASE}/interpret`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: preProcessCode(code),
      }),
    });

    if (res.status != 200) {
      return {
        tokens: [],
        ast_trees: [],
        program_output: [],
        error: res.status,
      };
    } else {
      const data = await res.json();
      return parseData(data);
    }
  };

  const handleSubmission = async () => {
    setLoading(true);
    const data = await fetchData();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="flex flex-row justify-center w-[95%] mx-auto">
      <div className="w-full">
        <Editor
          className="border-black border-[2px] rounded-t-lg h-[450px]"
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => code}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            backgroundColor: "lightgray",
          }}
        />
        <div className="bg-slate-500 h-[70px] z-0 border-black border-[2px] border-t-0 rounded-b-lg ">
          <button
            className="h-[50px] rounded-[5px] mr-[10px] w-[100px] mt-[10px] bg-green-600 text-white float-right z-10 hover:bg-green-800 "
            disabled={loading}
            onClick={() => handleSubmission()}
          >
            {loading ? (
              <div className="ml-[35px]">
                <ReactLoading
                  type="spin"
                  color="black"
                  height={"40%"}
                  width={"40%"}
                />
              </div>
            ) : (
              `Run`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
