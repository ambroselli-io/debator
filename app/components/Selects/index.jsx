import ReactSelect from "react-select";
import CreatableSelect from "react-select/creatable";
import { useSearchParams } from "remix";
import Required from "../Required";
import styles from "./styles.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

const customTheme = (theme) => ({
  ...theme,
  borderRadius: `0.5rem`,
  colors: {
    ...theme.colors,
    primary: "rgba(253, 126, 65, 1.00)",
    primary75: "rgba(253, 126, 65, 0.75)",
    primary50: "rgba(253, 126, 65, 0.5)",
    primary25: "rgba(253, 126, 65, 0.25)",
    neutral: "rgba(253, 126, 65, 1.00)",
    neutral90: "rgba(253, 126, 65, 0.9)",
    // neutral80: "rgba(253, 126, 65, 0.8)",
    neutral80: "rgb(17, 24, 39)", //text-black-900
    neutral70: "rgba(253, 126, 65, 0.7)",
    neutral60: "rgba(253, 126, 65, 0.6)",
    // neutral50: "rgba(253, 126, 65, 0.5)",
    // neutral80: "#9ca3af", // placeholder
    neutral40: "rgba(253, 126, 65, 0.4)",
    neutral30: "rgba(253, 126, 65, 0.3)",
    neutral20: "rgba(253, 126, 65, 0.2)",
    neutral10: "rgba(253, 126, 65, 0.1)",
    neutral5: "rgba(253, 126, 65, 0.05)",
  },
});

const rootCustomStyles = (control = {}) => ({
  placeholder: (provided, state) => ({
    ...provided,
    color: "#9ca3af",
  }),
  control: (provided, state) => ({
    ...provided,
    borderColor: "rgb(209, 213, 219, 1)",
    ...control,
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: "0.625rem",
  }),
  input: (provided, state) => ({
    ...provided,
    margin: 0,
    padding: 0,
  }),
});

const SelectRoot = ({
  name,
  options,
  defaultValue,
  onChange,
  form,
  isCreatable,
  customStyles,
  ...props
}) => {
  const Component = isCreatable ? CreatableSelect : ReactSelect;
  return (
    <Component
      defaultValue={defaultValue}
      name={name}
      form={form}
      options={options}
      onChange={onChange}
      className="w-full"
      classNamePrefix="select"
      theme={customTheme}
      styles={rootCustomStyles(customStyles)}
      {...props}
    />
  );
};

const SelectAutofill = ({
  legend,
  name,
  options,
  onChange,
  form,
  isCreatable,
  className = "",
  required = false,
  ...props
}) => {
  const [searchParams] = useSearchParams();
  const checkedValues = searchParams
    .getAll(name)
    .map((id) => options.find((opt) => opt.value === id));

  // FIXME: timeout so the Form can consider the new input hidden
  const onChangeRequest = (args) => setTimeout(() => onChange?.(args));

  return (
    <fieldset className={`flex flex-wrap gap-2 ${className}`}>
      <legend className="mb-2 flex-shrink-0 basis-full">
        {legend}
        {required && <Required />}
      </legend>
      <SelectRoot
        name={name}
        options={options}
        defaultValue={checkedValues}
        onChange={onChangeRequest}
        form={form}
        isCreatable={isCreatable}
        isMulti
        {...props}
      />
    </fieldset>
  );
};

const Select = ({
  legend,
  name,
  options,
  onChange,
  form,
  className = "",
  required = false,
  ...props
}) => {
  const [searchParams] = useSearchParams();
  const checkedValues = searchParams
    .getAll(name)
    .map((id) => options.find((opt) => opt.value === id));

  // FIXME: timeout so the Form can consider the new input hidden
  const onChangeRequest = (args) => setTimeout(() => onChange?.(args));

  return (
    <fieldset className={`flex flex-wrap gap-2 ${className}`}>
      <legend className="mb-2 flex-shrink-0 basis-full">
        {legend}
        {legend && required && <Required />}
      </legend>
      <SelectRoot
        name={name}
        options={options}
        defaultValue={checkedValues}
        onChange={onChangeRequest}
        form={form}
        {...props}
      />
    </fieldset>
  );
};

export { SelectAutofill, Select };
