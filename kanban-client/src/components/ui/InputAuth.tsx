type Props = {
  value: string;
  onChange: () => void;
  placeholder: string;
  type: string;
};
const InputAuth: React.FC<Props> = ({ onChange, placeholder, type, value }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gray5 focus:ring-2 focus:ring-gray8 transition-shadow shadow-sm hover:shadow-md focus:shadow-lg"
    />
  );
};

export default InputAuth;
