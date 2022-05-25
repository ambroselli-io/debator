import { useSearchParams } from "@remix-run/react";
import Required from "./Required";

const CheckBox = ({ name, value, label }) => {
  const [searchParams] = useSearchParams();
  const checkedValues = searchParams.getAll(name);
  return (
    <label>
      <input
        type="checkbox"
        name={name}
        value={value}
        className="peer hidden w-0"
        defaultChecked={checkedValues.includes(value)}
      />
      <div className="cursor-pointer rounded-lg border border-app bg-white px-2 py-1 text-app peer-checked:bg-app peer-checked:text-white">
        {label}
      </div>
    </label>
  );
};

const CheckBoxGroup = ({ legend, name, values, className = "", required = false }) => (
  <fieldset className={`flex flex-wrap gap-2 ${className}`}>
    <legend className="mb-2 flex-shrink-0 basis-full">
      {legend}
      {required && <Required />}
    </legend>
    {values.map(({ value, label }) => (
      <CheckBox key={value} name={name} value={value} label={label} />
    ))}
  </fieldset>
);

export default CheckBoxGroup;
