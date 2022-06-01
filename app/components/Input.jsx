import { useEffect, useRef } from "react";
import { useFetcher } from "remix";
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
  textarea = false,
  ...props
}) => {
  const ref = useRef(null);
  useEffect(() => {
    if (window.sessionStorage.getItem(id)?.length)
      ref.current.value = window.sessionStorage.getItem(id);
  }, [id]);

  const Tag = textarea ? "textarea" : "input";
  return (
    <div className="flex w-full flex-col items-start gap-2">
      <label htmlFor={`${name}-${id}`}>
        {label}
        {label && required && <Required />}
      </label>
      <Tag
        type={type}
        ref={ref}
        id={`${name}-${id}`}
        name={name}
        className={`block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 outline-app dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${className}`}
        placeholder={placeholder}
        required={required}
        onSubmit={() => {
          console.log("BIM");
          console.log(id);
        }}
        onKeyUp={(e) => window.sessionStorage.setItem(id, e.currentTarget.value)}
        {...props}
      />
    </div>
  );
};

export default Input;
