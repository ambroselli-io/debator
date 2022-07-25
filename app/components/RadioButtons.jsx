import { useSearchParams } from "@remix-run/react";

const RadioButtons = ({
  className = "",
  disabled = false,
  initAnswers = [],
  options = [],
  name,
}) => {
  const [searchParams] = useSearchParams();
  const checkedValues = initAnswers?.length ? initAnswers : searchParams.getAll(name);
  return (
    <div className={`flex w-full flex-col justify-evenly gap-2 ${className}`}>
      {options.map(({ value, label }) => (
        <fieldset key={value} className="flex w-full shrink-0 grow-0" disabled={disabled}>
          <input
            type="radio"
            required
            className="peer"
            name={name}
            value={value}
            id={value}
            defaultChecked={checkedValues.includes(value)}
          />
          <label
            htmlFor={value}
            className={`w-full cursor-pointer rounded-lg border border-app bg-white px-2 py-1 text-center text-app peer-checked:bg-app peer-checked:text-white ${className}`}
          >
            {label}
          </label>
        </fieldset>
      ))}
    </div>
  );
};

export default RadioButtons;
