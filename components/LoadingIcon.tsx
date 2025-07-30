import ReactLoading from "react-loading";

const LoadingIcon = () => {
  return (
    <div className="flex flex-col items-center mt-[5px]">
      <ReactLoading type="spin" color="green" />
      <span className="mt-[5px] font-semibold">
        This may take a few minutes...
      </span>
    </div>
  );
};

export default LoadingIcon;
