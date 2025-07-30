import { FC } from "react";
import Tree, { RawNodeDatum } from "react-d3-tree";

interface ASTProps {
  treeString: string;
}

const bin_op_string = new Map<string, string>([
  ["IntPlusOp", "+"],
  ["IntMinusOp", "-"],
  ["IntTimesOp", "*"],
  ["IntDivOp", "/"],
  ["ModOp", "%"],
  ["GtOp", ">"],
  ["GteOp", ">="],
  ["LtOp", "<"],
  ["LteOp", "<="],
  ["EqualityOp", "=="],
  ["NotEqualsOp", "!="],
  ["AndOp", "&&"],
  ["OrOp", "||"],
]);

const splitStringIntoArgs = (inside_str: string) => {
  let inner_idx = 0;
  let args = [];
  let curr_arg = "";
  let depth = 0;

  while (inner_idx < inside_str.length) {
    if (inside_str[inner_idx] == "," && depth == 0) {
      args.push(curr_arg.trim());
      curr_arg = "";
    } else if (inside_str[inner_idx] == "(" || inside_str[inner_idx] == "[") {
      depth += 1;
      curr_arg += inside_str[inner_idx];
    } else if (inside_str[inner_idx] == ")" || inside_str[inner_idx] == "]") {
      depth -= 1;
      curr_arg += inside_str[inner_idx];
    } else {
      curr_arg += inside_str[inner_idx];
    }
    inner_idx += 1;
  }
  args.push(curr_arg.trim());
  return args;
};

const constructTree = (treeString: string): RawNodeDatum => {
  let exp_string = "";
  let idx = 0;
  while (idx < treeString.length && treeString[idx] != "(") {
    exp_string += treeString[idx];
    idx += 1;
  }
  let inside_str = treeString.substring(idx + 1, treeString.length - 1);
  switch (exp_string) {
    case "ConstExp": {
      let inner_idx = 0;
      while (inner_idx < inside_str.length && inside_str[inner_idx] != " ") {
        inner_idx += 1;
      }
      let const_val = inside_str.substring(inner_idx + 1);
      return {
        name: "Const",
        children: [
          {
            name: const_val,
          },
        ],
      };
    }
    case "LetExp": {
      const args = splitStringIntoArgs(inside_str);
      const right_tree = constructTree(args[1]);
      return {
        name: "Let",
        children: [{ name: args[0] }, { name: "=" }, right_tree],
      };
    }
    case "ReassignExp": {
      const args = splitStringIntoArgs(inside_str);
      const right_tree = constructTree(args[1]);
      return {
        name: "Assign",
        children: [{ name: args[0] }, { name: "=" }, right_tree],
      };
    }
    case "MonadicExp": {
      const args = splitStringIntoArgs(inside_str);
      let mon_op = args[0] == "Print" ? "print" : "-";
      const right_tree = constructTree(args[1]);
      return { name: "Unary", children: [{ name: mon_op }, right_tree] };
    }
    case "VarExp": {
      const var_name = inside_str;
      return {
        name: `Var ${var_name}`,
      };
    }
    case "IfExp": {
      const args = splitStringIntoArgs(inside_str);
      let cond_tree: RawNodeDatum = {
        name: "COND",
        children: [constructTree(args[0])],
      };

      let if_exps = splitStringIntoArgs(args[1].slice(1, -1)); // parse list of expressions
      let true_tree: RawNodeDatum = {
        name: "THEN",
        children: if_exps.map((inner_exp) => constructTree(inner_exp)),
      };

      let else_exps = splitStringIntoArgs(args[2].slice(1, -1)); // parse list of expressions
      let false_tree: RawNodeDatum = {
        name: "ELSE",
        children: else_exps.map((inner_exp) => constructTree(inner_exp)),
      };

      return {
        name: "If-Else",
        children: [cond_tree, true_tree, false_tree],
      };
    }
    case "WhileExp": {
      const args = splitStringIntoArgs(inside_str);
      let cond_tree: RawNodeDatum = {
        name: "COND",
        children: [constructTree(args[0])],
      };

      let if_exps = splitStringIntoArgs(args[1].slice(1, -1)); // parse list of expressions
      let true_tree: RawNodeDatum = {
        name: "DO",
        children: if_exps.map((inner_exp) => constructTree(inner_exp)),
      };

      return {
        name: "While",
        children: [cond_tree, true_tree],
      };
    }
    case "ListExp": {
      let list_exps = splitStringIntoArgs(inside_str.slice(1, -1));
      let list_tree: RawNodeDatum = {
        name: "List",
        children: list_exps.map((inner_exp) => constructTree(inner_exp)),
      };
      return list_tree;
    }
    case "ListAccessExp": {
      const args = splitStringIntoArgs(inside_str);
      let access_tree: RawNodeDatum = {
        name: "ListAccess",
        children: [
          constructTree(args[0]),
          { name: "[" },
          constructTree(args[1]),
          { name: "]" },
        ],
      };
      return access_tree;
    }
    default: {
      const args = splitStringIntoArgs(inside_str);
      let op = bin_op_string.get(args[0].trim());
      // switch (args[0].trim()) {
      //   case "IntPlusOp": {
      //     op = "+";
      //     break;
      //   }
      //   case "IntTimesOp": {
      //     op = "*";
      //     break;
      //   }
      //   case "IntDivOp": {
      //     op = "/";
      //     break;
      //   }
      //   case "IntMinusOp": {
      //     op = "-";
      //     break;
      //   }
      //   case "ModOp": {
      //     op = "%";
      //     break;
      //   }
      // }
      const left_tree = constructTree(args[1]);
      const right_tree = constructTree(args[2]);
      return {
        name: "Binary",
        children: [left_tree, { name: op ? op : "N/A" }, right_tree],
      };
    }
  }
};

const AbstractSyntaxTree: FC<ASTProps> = ({ treeString }) => {
  return (
    <div
      className="flex flex-row justify-center"
      style={{
        width: "90%",
        height: 400,
        border: "1px solid black",
        margin: "auto",
        marginTop: "30px",
      }}
    >
      <Tree
        data={constructTree(treeString)}
        orientation="vertical"
        pathFunc={"straight"}
        translate={{ x: 400, y: 50 }}
        zoom={0.75}
      />
    </div>
  );
};

export default AbstractSyntaxTree;
