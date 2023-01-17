import { TextField } from "@mui/material";
import { ChangeEvent, ComponentPropsWithoutRef } from "react";

interface WireSearcherProps extends ComponentPropsWithoutRef<"div"> {
  sx: object;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const WireSearcher = (props: WireSearcherProps) => {
  return (
    <TextField
      sx={props.sx}
      label="Search"
      variant="outlined"
      size="small"
      onChange={props.onChange}
    />
  );
};

export default WireSearcher;
