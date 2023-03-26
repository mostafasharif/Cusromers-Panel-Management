import React from "react";
import "../LoadingSpinnerresu/spinnerresu.css";
import { getAccessToken, requestHandler } from "../../../utils";
import { tableReq } from "../../../context/Action";

export default function spinner() {
  function stop_search() {
    var textmessage = {
      search : "stop"
    }

    requestHandler(tableReq , textmessage)


  }

  return (
    <div>
      <div className="loading">&#8230;</div>
      <div className="loading">&#8230;</div>
      <button className="stop-search" onClick={stop_search}>
        Cancel
      </button>
    </div>
  );
}
