import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import "../../../styles/main/index.css";

export default function Count({ isLoad }) {
  const { globalState } = useContext(GlobalContext);

  return (
    <>
      <div>
        <p className={"result-btn"}> Result : {globalState.count === null ? <>Loading ...</> : globalState.count} </p>
      </div>
    </>
  );
}
