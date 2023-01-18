import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, ListItem, ListItemButton } from "@mui/material";
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
  editHandler: (wire: Wire) => void;
}

const WireListItem = (props: WireListItemProps) => {
  const onDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    props.deleteHandler(props.wire);
  };

  const onEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    props.editHandler(props.wire);
  };

  return (
    <ListItem sx={{ p: 0 }}>
      <ListItemButton sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div>{props.wire.title}</div>
          <div style={{ fontSize: "0.7rem" }}>
            {dateFormatter(props.wire.date)}
          </div>
        </div>
        <Box sx={{display: 'flex'}}>
          <Button
            sx={{mr: 1}}
            onClick={onEditClick}
            variant="outlined"
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            onClick={onDeleteClick}
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default WireListItem;
