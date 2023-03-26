import React, { useEffect, useRef } from "react";

const FiltersC = ({ image, data, setStatus }) => {
  const wholeValueRef = useRef();
  const handleClick = (event, value) => {
    setStatus((prev) => {
      return { ...prev, ...(prev[data.title].value = value) };
    });
    const prev = wholeValueRef.current.querySelector(".value-select");
    if (prev) {
      prev.classList.remove("value-select");
    }
    const noneBtn = event.currentTarget;
    noneBtn.classList.add("value-select");
  };

  const next = (arg) => {
    if (arg === "_") return "1";
    else if (arg === "1") return "0";
    else return "_";
  };

  function handleIMgClick(e, value) {
    setStatus((prev) => {
      return{...prev,...(prev[data.title].value = next(value)) }
    })
  }

  useEffect(() => {
    // console.log(data);
  }, [data]);
  return (
    <div className="whole-Filter" ref={wholeValueRef}>
      <img src={image} alt="FiltersC" onClick={(e) => handleIMgClick(e, data.value)} />
      <div className="tri-state-toggle">
        <button onClick={(e) => handleClick(e, "0")} className={`tri-state-toggle-buttontwo none${data.value === "0" ? " value-select" : ""}`} />
        <button
          onClick={(e) => handleClick(e, "_")}
          data-default="true"
          className={`tri-state-toggle-buttontwo zero${data.value === "_" ? " value-select" : ""}`}
        />
        <button onClick={(e) => handleClick(e, "1")} className={`tri-state-toggle-buttontwo yes${data.value === "1" ? " value-select" : ""}`} />
      </div>
    </div>
  );
};
export default FiltersC;
