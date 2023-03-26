const InputText = ({ data, setData }) => {
  const fillForm = (value) => {
    setData((prev) => {
      return { ...prev, [data.title]: { ...prev[data.title], value: value } };
    });
  };

  return (
    <input
      type="text"
      placeholder={data}
      className="form-input phone-btn"
      required
      value={data}
      // value={data.value}
      onChange={(e) => fillForm(e.currentTarget.value)}
    />
  );
};

export default InputText;
