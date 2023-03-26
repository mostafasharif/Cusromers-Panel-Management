import "../../styles/mficon.css";
const InputSelect = ({ data, setData }) => {
  const fillForm = (value) => {
    setData((prev) => {
      return { ...prev, [data.title]: { ...prev[data.title], value: value } };
    });
  };

  return (
    <select className="option-select" value={data.value} onChange={(e) => fillForm(e.target.value)}>
      {data.options?.map((option, index) => {
        return (
          <option value={option.key} key={index}>
            {option.title}
          </option>
        );
      })}
    </select>
  );
};

export default InputSelect;
