import { FC, PropsWithChildren } from "react";

const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="mt-[10px] mb-[30px] p-[10px] pb-[20px] shadow-lg border-black border-[1px] rounded-lg">
      {children}
    </div>
  );
};

export default Container;
