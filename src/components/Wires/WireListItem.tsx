import DeleteIcon from "@mui/icons-material/Delete";
import { Button, ListItem, ListItemButton } from "@mui/material";
import { ComponentPropsWithoutRef } from "react";
import { Wire } from "./WireList";

const dateFormatter = (d: Date) => {
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

interface WireListItemProps extends ComponentPropsWithoutRef<"div"> {
  wire: Wire;
  deleteHandler: (wire: Wire) => void;
}

const WireListItem = (props: WireListItemProps) => {
  const onDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    props.deleteHandler(props.wire);
  };

  return (
    <ListItem sx={{ p: 0 }}>
      <ListItemButton sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div>{props.wire.title}</div>
          <div style={{fontSize: '0.7rem'}}>{dateFormatter(props.wire.date)}</div>
        </div>
        <Button
          onClick={onDeleteClick}
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </ListItemButton>
    </ListItem>
  );
};

export default WireListItem;
