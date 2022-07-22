const RadioButtons = ({
  className = "",
  disabled = false,
  options = [
    {
      id: "fully-agree",
      label: "Tout à fait d'accord",
    },
    {
      id: "agree",
      label: "D'accord",
    },
    {
      id: "neutral",
      label: "Pas d'avis",
    },
    {
      id: "disagree",
      label: "Pas d'accord",
    },
    {
      id: "fully-disagree",
      label: "Pas du tout d'accord",
    },
  ],
  name,
}) => {
  return (
    <div className={`flex w-full flex-col justify-evenly gap-5 ${className}`}>
      {options.map((option) => (
        <fieldset
          key={option.id}
          className="flex w-full shrink-0 grow-0"
          disabled={disabled}
        >
          <input
            type="radio"
            required
            className="peer"
            name={name}
            id={option.id}
            value={option.id}
          />
          <label
            htmlFor={option.id}
            className="shrink-0 grow cursor-pointer rounded-lg border border-app border-opacity-20 bg-white px-10 py-2 text-center text-app disabled:opacity-50 peer-checked:border-opacity-100 peer-checked:font-bold peer-invalid:border-app peer-disabled:pointer-events-none peer-disabled:opacity-30"
          >
            {option.label}
          </label>
        </fieldset>
      ))}
    </div>
  );
};

export default RadioButtons;
