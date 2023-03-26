import React from "react";
import "../../styles/spinner/spinner.css";
export default function spinner() {
    return (
            <div className="loader-wrapper">
            <div className="loader"></div>
            <div className="loader"></div>
          </div>
    );
}