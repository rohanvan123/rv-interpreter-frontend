import { FC, PropsWithChildren } from "react";

const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="p-[10px] pb-[20px] shadow-lg border-black border-[1px] rounded-lg w-[95%] mx-auto">
      {children}
    </div>
  );
};

export default Container;
