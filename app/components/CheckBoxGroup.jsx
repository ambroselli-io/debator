import { useSearchParams } from "remix";

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

const CheckBoxGroup = ({ legend, name, values }) => (
  <fieldset className="flex flex-wrap gap-2">
    <legend className="mb-2 flex-shrink-0 basis-full">{legend}</legend>
    {values.map(({ value, label }) => (
      <CheckBox key={value} name={name} value={value} label={label} />
    ))}
  </fieldset>
);

export default CheckBoxGroup;
