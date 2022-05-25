import { useMemo } from "react";
import { useSearchParams } from "@remix-run/react";

const RangeInput = ({ min, max, step, name, className, required = false }) => {
  const [searchParams] = useSearchParams();
  const options = useMemo(() => Array.from(Array(max - min).keys()), [min, max]);
  return (
    <>
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        step={step}
        list="stars"
        defaultValue={searchParams.get(name) || String(min)}
        className={className}
        required={required}
      />
      <datalist id="stars">
        {options.map((_, index) => (
          <option value={index + min} key={index + min} />
        ))}
      </datalist>
    </>
  );
};

export default RangeInput;
