import React from "react";
import "./Popup.css";
import { Button } from "@mui/material";
import { Close } from "@mui/icons-material";

function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <Button
          size="small"
          className="close-btn"
          onClick={() => props.setTrigger(false)}
        >
          <Close />
        </Button>
        {props.component}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
