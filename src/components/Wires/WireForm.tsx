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
  useCallback,
  useMemo,
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
  titleIsTouched: boolean;
  date: string | null | undefined;
  dateIsTouched: boolean;
}

const defaultState: WireFormState = {
  title: "",
  titleIsTouched: false,
  date: "",
  dateIsTouched: false,
};

const WireForm = (props: WireFormProps) => {
  const setDefaultState = (wire: Wire | null): WireFormState => {
    if (wire) {
      const dateString = moment(wire.date).format("YYYY-MM-DD").toString();

      const state: WireFormState = {
        title: wire.title,
        titleIsTouched: false,
        date: dateString,
        dateIsTouched: false,
      };

      return state;
    } else {
      return defaultState;
    }
  };

  const [wireFormState, setWireFormState] = useState<WireFormState>(
    setDefaultState(props.wire)
  );

  const titleBlurHandler = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setWireFormState((previousState) => {
        return { ...previousState, titleIsTouched: true };
      });
    },
    []
  );

  const titleChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const titleInput = event.target.value;
      setWireFormState((previous: WireFormState) => {
        return {
          ...previous,
          title: titleInput,
        };
      });
    },
    []
  );

  const dateBlurHandler = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setWireFormState((previousState) => {
        return { ...previousState, dateIsTouched: true };
      });
    },
    []
  );

  const dateChangeHandler = useCallback(
    (value: Moment | null, input?: string | undefined) => {
      setWireFormState((previous: WireFormState) => {
        let date: string | null = null;
        if (value) {
          date = value.format("YYYY-MM-DD").toString();
        }
        return { ...previous, date };
      });
    },
    []
  );

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

  const titleIsValid = useMemo(() => validateTitle(wireFormState.title), [wireFormState.title]);
  const dateIsValid = useMemo(() => validateDate(wireFormState.date), [wireFormState.date]);

  const formIsValid = useCallback(() => {
    return titleIsValid && dateIsValid;
  }, [titleIsValid, dateIsValid]);

  const { wire, submitHandler, closeHandler } = props;

  const handleSubmitClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (formIsValid()) {
        let _wire: Wire;

        if (wire) {
          _wire = Wire.copyOf(wire, (wire) => {
            wire.title = wireFormState.title;
            wire.date = wireFormState.date as string;
          });
        } else {
          _wire = new Wire({
            title: wireFormState.title,
            date: wireFormState.date as string,
          });
        }

        submitHandler(_wire);
        closeHandler();

        setWireFormState(defaultState);
      } else {
        setWireFormState((previousState) => {
          return {
            ...previousState,
            titleIsTouched: true,
            dateIsTouched: true,
          };
        });
      }
    },
    [
      formIsValid,
      wire,
      closeHandler,
      submitHandler,
      wireFormState.date,
      wireFormState.title,
    ]
  );

  const handleClose = useCallback(() => {
    setWireFormState(defaultState);
    closeHandler();
  }, [closeHandler]);

  return (
    <Dialog disableRestoreFocus open={true} onClose={handleClose} fullWidth maxWidth="sm">
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
            error={wireFormState.titleIsTouched && titleIsValid === false}
            helperText={
              wireFormState.titleIsTouched &&
              titleIsValid === false &&
              "Please enter a title."
            }
            onBlur={titleBlurHandler}
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
                error={wireFormState.dateIsTouched && dateIsValid === false}
                helperText={
                  wireFormState.dateIsTouched &&
                  dateIsValid === false &&
                  "Please select a date."
                }
                onBlur={dateBlurHandler}
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
          disabled={!formIsValid()}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WireForm;
