import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  useEffect,
  useState,
} from "react";
import { Wire } from "./WireList";

interface WireFormProps extends ComponentPropsWithoutRef<"div"> {
  wire: Wire | null;
  closeHandler: () => void;
  submitHandler: (wire: Wire) => void;
}

interface WireFormState {
  id: number | null;
  title: string;
  titleIsValid: boolean | null;
  date: string | null;
  dateIsValid: boolean | null;
  formIsValid: boolean;
}

const defaultState: WireFormState = {
  id: null,
  title: "",
  titleIsValid: null,
  date: "",
  dateIsValid: null,
  formIsValid: false,
};

const WireForm = (props: WireFormProps) => {
  const setDefaultState = (wire: Wire | null): WireFormState => {
    if (wire) {
      const dateString = moment(wire.date).format('MM/DD/YYYY').toString();

      const state: WireFormState = {
        id: wire.id,
        title: wire.title,
        titleIsValid: validateTitle(wire.title),
        date: dateString,
        dateIsValid: validateDate(dateString),
        formIsValid: false
      };

      state.formIsValid = validateForm(state);

      return state;
    } else {
      return defaultState;
    }
  }

  const validateTitle = (title: string): boolean => {
    return title !== null && title.trim().length > 0;
  };

  const validateDate = (date: string | null): boolean => {
    if (date === null) {
      return false;
    } else {
      const _moment = moment(date);
      return _moment.isValid();
    }
  };

  const validateForm = (wireFormState: WireFormState): boolean => {
    return (
      wireFormState.dateIsValid === true && wireFormState.titleIsValid === true
    );
  };

  const [wireFormState, setWireFormState] =
    useState<WireFormState>(setDefaultState(props.wire));

  useEffect(() => {
    const formIsValid = validateForm(wireFormState);
    setWireFormState({ ...wireFormState, formIsValid: formIsValid });
  }, [wireFormState.dateIsValid, wireFormState.titleIsValid]);

  const titleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const titleInput = event.target.value;
    setWireFormState((previous: WireFormState) => {
      return {
        ...previous,
        title: titleInput,
        titleIsValid: validateTitle(titleInput),
      };
    });
  };

  const dateChangeHandler = (value: string | null) => {
    setWireFormState((previous: WireFormState) => {
      return { ...previous, date: value, dateIsValid: validateDate(value) };
    });
  };

  const handleSubmitClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (wireFormState.formIsValid) {
      const wire: Wire = {
        id: wireFormState.id || Math.random(),
        title: wireFormState.title,
        date: moment(wireFormState.date).toDate(),
      };

      props.submitHandler(wire);
      props.closeHandler();

      setWireFormState(defaultState);
    }
  };

  const handleClose = () => {
    setWireFormState(defaultState);
    props.closeHandler();
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>New Wire</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }} noValidate>
          <TextField
            sx={{ display: "block" }}
            autoFocus
            id="title"
            label="Title"
            type="text"
            variant="outlined"
            value={wireFormState.title}
            onChange={titleChangeHandler}
            fullWidth
            error={wireFormState.titleIsValid === false}
            helperText={
              wireFormState.titleIsValid === false && "Please enter a title."
            }
          />
          <DatePicker
            label="Date"
            inputFormat="MM/DD/YYYY"
            value={wireFormState.date}
            onChange={dateChangeHandler}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ display: "block", mt: 1 }}
                error={wireFormState.dateIsValid === false}
                helperText={
                  wireFormState.dateIsValid === false && "Please select a date."
                }
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSubmitClick}
          variant="outlined"
          disabled={!wireFormState.formIsValid}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WireForm;
