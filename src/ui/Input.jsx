const Input = ({
  label,
  placeholder,
  width = "100%",
  type = "text",
  value,
  onChange,
  name,
  className,
}) => {
  return (
    <div style={{ width }} className="flex flex-col gap-1">
      {label && (
        <label className="block text-sm font-semibold  mb-1">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
      />
    </div>
  );
};

export default Input;