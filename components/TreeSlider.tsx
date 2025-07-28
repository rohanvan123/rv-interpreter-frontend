import { FC, useEffect, useState } from "react";
import AbstractSyntaxTree from "./AbstractSyntaxTree";

interface TreeSliderProps {
  astTrees: string[];
}

const TreeSlider: FC<TreeSliderProps> = ({ astTrees }) => {
  const [treeIdx, setTreeIdx] = useState<number>(0);

  useEffect(() => {
    setTreeIdx(0);
  }, [astTrees]);

  return (
    <div className="flex flex-row">
      <button
        onClick={() => {
          if (treeIdx !== 0) setTreeIdx(treeIdx - 1);
        }}
        disabled={treeIdx == 0}
      >
        &lt;&lt;
      </button>
      <AbstractSyntaxTree treeString={astTrees[treeIdx]} />
      <button
        onClick={() => {
          if (treeIdx !== astTrees.length - 1) setTreeIdx(treeIdx + 1);
        }}
        disabled={treeIdx == astTrees.length - 1}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default TreeSlider;
