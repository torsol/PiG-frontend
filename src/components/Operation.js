import React, { useState } from "react";

import InputField from "./InputField";
import { ClearOutlined, CheckOutlined } from "@material-ui/icons";
import ArrowForward from "@material-ui/icons/ArrowForwardIosOutlined";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";
import { Tooltip } from "@material-ui/core";

const TextOnlyTooltip = withStyles({
  tooltip: {
    fontSize: "13px",
  },
})(Tooltip);

const Operation = ({ onClick, name, icon, selectable, enabled }) => {
  const [selected, setSelected] = useState(false);
  const [value, setValue] = useState(10);

  const toggleSelect = () => {
    return enabled ? setSelected(!selected) : null;
  };

  const Execute = () => {
    return enabled ? onClick() : null;
  };

  const closeAndExectue = (value) => {
    if (enabled) {
      onClick(value);
      toggleSelect();
    }
  };
  return !selected ? (
    <div
      className={enabled ? "operation" : "disabledOperation"}
      onClick={selectable ? toggleSelect : () => Execute()}
    >
      <ListItem disableGutters>{name}</ListItem>
      {
        // Default icon is arrow forward
      }
      {icon ? icon : <ArrowForward />}
    </div>
  ) : (
    <div className="operation">
      <TextOnlyTooltip title={"Enter buffer [m]"}>
        <ListItem disableGutters>
          <InputField
            value={value}
            handleChange={(e) => setValue(e.target.value)}
          />
        </ListItem>
      </TextOnlyTooltip>
      <ClearOutlined onClick={toggleSelect} />
      <CheckOutlined onClick={() => closeAndExectue(value)} />
    </div>
  );
};

export default Operation;
