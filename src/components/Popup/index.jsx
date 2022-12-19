import React from "react";
import "./Popup.css";

function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => props.setTrigger(false)}
        ></button>
        <div className="scrollable">{props.component}</div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
