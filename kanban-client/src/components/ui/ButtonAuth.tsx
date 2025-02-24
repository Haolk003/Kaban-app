type Props = {
  title: string;
  handle?: () => void;
  type?: "button" | "submit" | "reset";
};
const ButtonAuth: React.FC<Props> = ({ title, type, handle }) => {
  return (
    <button
      className="w-full h-[35px] rounded-md bg-iris8 text-white shadow-sm hover:bg-iris10 cursor-pointer"
      type={type ? type : "button"}
      onClick={handle}
    >
      {title}
    </button>
  );
};

export default ButtonAuth;
