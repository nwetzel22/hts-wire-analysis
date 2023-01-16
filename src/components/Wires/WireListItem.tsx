import { ListItem, ListItemButton } from "@mui/material";
import { Wire } from "./WireList";

const dateFormatter = (d: Date) => {
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const WireListItem = (wire: Wire) => {
  return (
    <ListItem sx={{ p: 0 }}>
      <ListItemButton sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>{wire.title}</div>
        <div>{dateFormatter(wire.date)}</div>
      </ListItemButton>
    </ListItem>
  );
};

export default WireListItem;
