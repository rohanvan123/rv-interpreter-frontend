import ReactLoading from "react-loading";

const LoadingIcon = () => {
  return (
    <div className="flex flex-col items-center mt-[20px]">
      <ReactLoading type="spin" color="green" />
    </div>
  );
};

export default LoadingIcon;
