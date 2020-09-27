import React, {useState} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";
import HomeIcon from "@material-ui/icons/Home";
import ReceiptIcon from "@material-ui/icons/Receipt";

import calculateBuffer from './utils/APIConnection'

const items = [
  { name: "solberGis", label: "solberGis", Icon: HomeIcon },
  "divider",
  {
      name: "Operations",
      label: "Operations",
      Icon: ReceiptIcon,
      items: [
          { name: "Buffer", label: "Buffer", "onClick": calculateBuffer }
      ]
  }
];


function SidebarItem({ depthStep = 10, depth = 0, expanded, item, setLayers, ...rest }) {
  const [collapsed, setCollapsed] = useState(true);
  const { label, items, Icon, onClick: onClickProp } = item;

  function toggleCollapse() {
    setCollapsed(prevValue => !prevValue);
  }

  function onClick(e) {
    if (Array.isArray(items)) {
      toggleCollapse();
    }
    if (onClickProp) {
      onClickProp(setLayers);
    }
  }

  let expandIcon;

  if (Array.isArray(items) && items.length) {
    expandIcon = !collapsed ? (
      <ExpandLessIcon
        className={
          ["sidebar-item-expand-arrow", " sidebar-item-expand-arrow-expanded"]
        }
      />
    ) : (
      <ExpandMoreIcon className="sidebar-item-expand-arrow" />
    );
  }

  return (
    <>
      <ListItem
        className="sidebar-item"
        onClick={onClick}
        button
        dense
        {...rest}
      >
        <div
          style={{ paddingLeft: depth * depthStep }}
          className="sidebar-item-content"
        >
          {Icon && <Icon className="sidebar-item-icon" fontSize="small" />}
          <div className="sidebar-item-text">{label}</div>
        </div>
        {expandIcon}
      </ListItem>
      <Collapse in={!collapsed} timeout="auto" unmountOnExit>
        {Array.isArray(items) ? (
          <List disablePadding dense>
            {items.map((subItem, index) => (
              <React.Fragment key={`${subItem.name}${index}`}>
                {subItem === "divider" ? (
                  <Divider style={{ margin: "6px 0" }} />
                ) : (
                  <SidebarItem
                    depth={depth + 1}
                    depthStep={depthStep}
                    item={subItem}
                  />
                )}
              </React.Fragment>
            ))}
          </List>
        ) : null}
      </Collapse>
    </>
  );
}

const Sidebar = ({setLayers}) => {
  return (
    <div className="sidebar">
      <List disablePadding dense>
      <ListItem onClick={(calculateBuffer(setLayers))}>Buffer</ListItem>
      </List>
    </div>
  );
}

export default Sidebar;