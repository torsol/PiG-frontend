import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import HelpOutlineIcon from "@material-ui/icons/HelpOutlineOutlined";

import InputField from "./InputField";
import { ClearOutlined, CheckOutlined } from "@material-ui/icons";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";
import { Tooltip } from "@material-ui/core";

const TextOnlyTooltip = withStyles({
  tooltip: {
    fontSize: "13px",
  },
})(Tooltip);

const Operation = ({ onClick, name, icon, selectable, enabled, popoverText }) => {
  const [selected, setSelected] = useState(false);
  const [value, setValue] = useState(10);

  const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
      width: 200,
      fontSize: "13px"
    },
  }));

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

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : null;

  return (
    <React.Fragment>
      {!selected ? (
        <div className="operationdiv">
          <ListItem
            onClick={selectable ? toggleSelect : () => Execute()}
            className={enabled ? "operation" : "disabledOperation"}
            disableGutters
          >
            {name}
          </ListItem>
          {icon ? icon : <HelpOutlineIcon onClick={handleClick} />}
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
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>
          {popoverText}
        </Typography>
      </Popover>
    </React.Fragment>
  );
};

export default Operation;
