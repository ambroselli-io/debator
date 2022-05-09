import { useMemo } from "react";
import { useSearchParams } from "remix";

const RangeInput = ({ min, max, step, name, className }) => {
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
