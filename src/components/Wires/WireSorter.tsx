import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
} from "@mui/material";
import { ComponentPropsWithoutRef } from "react";

export interface WireSorterProps extends ComponentPropsWithoutRef<"div"> {
  category: string;
  direction: string;
  onCategoryChange: (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => void;
  onDirectionChange: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const WireSorter = (props: WireSorterProps) => {
  return (
    <Box>
      <FormControl size="small">
        <InputLabel id="wire-sort">Sort By</InputLabel>
        <Select
          labelId="wire-sort-label"
          id="wire-sort"
          value={props.category}
          label="Sort By"
          onChange={props.onCategoryChange}
        >
          <MenuItem value="Date">Date</MenuItem>
          <MenuItem value="Title">Title</MenuItem>
        </Select>
      </FormControl>
      <Tooltip
        title={`Sort by ${
          props.direction === "asc" ? "descending" : "ascending"
        } order`}
      >
        <IconButton
          onClick={props.onDirectionChange}
          aria-label="sort direction"
        >
          {props.direction === "asc" && <ArrowDownwardIcon />}
          {props.direction === "desc" && <ArrowUpwardIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default WireSorter;
