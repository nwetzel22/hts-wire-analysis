import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  useEffect,
  useState,
} from "react";
import { Wire } from "../../models";

interface WireFormProps extends ComponentPropsWithoutRef<"div"> {
  wire: Wire | null;
  closeHandler: () => void;
  submitHandler: (wire: Wire) => void;
}

interface WireFormState {
  title: string;
  titleIsValid: boolean | null;
  date: string | null | undefined;
  dateIsValid: boolean | null;
  formIsValid: boolean;
}

const defaultState: WireFormState = {
  title: "",
  titleIsValid: null,
  date: "",
  dateIsValid: null,
  formIsValid: false,
};

const WireForm = (props: WireFormProps) => {
  const setDefaultState = (wire: Wire | null): WireFormState => {
    if (wire) {
      const dateString = moment(wire.date).format('YYYY-MM-DD').toString();

      const state: WireFormState = {
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

  const validateDate = (date: string | null | undefined): boolean => {
    if (date) {
      const _moment = moment(date);
      return _moment.isValid();
    } else {
      return false;
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

  const dateChangeHandler = (value: Moment | null, input?: string | undefined) => {
    console.log(value);
    setWireFormState((previous: WireFormState) => {
      let date: string | null = null;
      let dateIsValid = false;
      if (value) {
        date = value.format('YYYY-MM-DD').toString();
        dateIsValid = value.isValid();
      }
      return { ...previous, date, dateIsValid };
    });
  };

  const handleSubmitClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (wireFormState.formIsValid) {
      let wire: Wire;

      if (props.wire) {
        wire = Wire.copyOf(props.wire, wire => {
          wire.title = wireFormState.title;
          wire.date = wireFormState.date as string;
        });
      } else {
        console.log(wireFormState.date);
        wire = new Wire({
          title: wireFormState.title,
          date: wireFormState.date as string,
        });
      }

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
    <Dialog open={true} onClose={handleClose} fullWidth maxWidth="sm">
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
            inputFormat="YYYY-MM-DD"
            value={wireFormState.date}
            onChange={dateChangeHandler}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
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
