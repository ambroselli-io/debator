import Required from "./Required";

// https://flowbite.com/docs/forms/search-input/
const Input = ({
  type,
  label,
  placeholder,
  name,
  className = "",
  id,
  required = false,
  ...props
}) => {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      <label htmlFor={`${name}-${id}`}>
        {label}
        {required && <Required />}
      </label>
      <input
        type={type}
        id={`${name}-${id}`}
        name={name}
        className={`text-gray-900dark:border-gray-600 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm outline-app dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${className}`}
        placeholder={placeholder}
        required={required}
        {...props}
      />
    </div>
  );
};

export default Input;
