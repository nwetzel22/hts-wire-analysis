import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Divider,
  List,
  Paper,
  Portal,
  SelectChangeEvent,
} from "@mui/material";
import { DataStore } from "aws-amplify";
import moment from "moment";
import {
  ChangeEvent,
  Fragment,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import AppContext from "../../contexts/AppContext";
import { Wire } from "../../models";
import WireForm from "./WireForm";
import WireListItem from "./WireListItem";
import WireSearcher from "./WireSearcher";
import WireSorter from "./WireSorter";

// const DUMMIES: Wire[] = [
//   { title: "AMSC Amperium® 2G HTS", date: new Date(2014, 10, 30), id: 1 },
//   {
//     title: "AMSC Amperium® Type 8502-350 coil formulation 2G HTS",
//     date: new Date(2019, 7, 1),
//     id: 2,
//   },
//   {
//     title: "AMSC Amperium® Type 8700 cable formulation 2G HTS",
//     date: new Date(2017, 10, 4),
//     id: 3,
//   },
//   {
//     title: "AMSC Amperium® Type 8702 non-magnetic cable formulation 2G HTS",
//     date: new Date(2017, 10, 4),
//     id: 4,
//   },
//   { title: "Fujikura FESC 2G HTS", date: new Date(2021, 8, 18), id: 5 },
//   { title: "Fujikura FYSC 2G HTS", date: new Date(2021, 10, 28), id: 6 },
//   { title: "InnoST 1G HTS", date: new Date(2019, 10, 22), id: 7 },
//   { title: "Nexans Bi-2212", date: new Date(2016, 8, 25), id: 8 },
//   { title: "Samri 2G HTS", date: new Date(2019, 4, 29), id: 9 },
//   {
//     title: "Shanghai Creative Superconductor Technologies 2G HTS",
//     date: new Date(2017, 8, 15),
//     id: 10,
//   },
//   {
//     title: "Shanghai Superconductor High Field Low Temperature 2G HTS",
//     date: new Date(2022, 2, 20),
//     id: 11,
//   },
//   {
//     title: "Shanghai Superconductor Low Field High Temperature 2G HTS",
//     date: new Date(2022, 2, 20),
//     id: 12,
//   },
//   { title: "STI Conductus® 2G HTS", date: new Date(2016, 8, 25), id: 13 },
//   {
//     title: "Sumitomo new type H DI-BSCCO®",
//     date: new Date(2014, 10, 6),
//     id: 14,
//   },
//   { title: "SuNAM HAN04200 2G HTS", date: new Date(2017, 7, 7), id: 15 },
//   { title: "SuNAM HAN04200 2G HTS", date: new Date(2017, 7, 7), id: 16 },
//   { title: "SuperOx GdBCO 2G HTS", date: new Date(2021, 2, 3), id: 17 },
//   { title: "SuperOx YBCO 2G HTS", date: new Date(2021, 2, 4), id: 18 },
//   {
//     title: "SuperPower Advanced Pinning 2G HTS",
//     date: new Date(2021, 3, 1),
//     id: 19,
//   },
//   { title: "THEVA Pro-Line 2G HTS", date: new Date(2019, 2, 19), id: 20 },
// ];

const WireList = () => {
  const [wires, setWires] = useState<Wire[]>([]);
  const [sortCategory, setSortCategory] = useState<string>("Date");
  const [sortDirection, setSortDirection] = useState<string>("asc");
  const [searchString, setSearchString] = useState<string>("");
  const [wireFormIsOpen, setWireFormIsOpen] = useState(false);
  const [wireToEdit, setWireToEdit] = useState<Wire | null>(null);

  const appContext = useContext(AppContext);
  const modalContainerRef = appContext.modalContainerRef as RefObject<Element>;
  const timer = useRef<NodeJS.Timeout | null>(null);

  const fetchWires = async () => {
    try {
      const wires = await DataStore.query(Wire);
      console.log("Fetched", wires);
      setWires(wires);
    } catch {
      throw Error("Error fetching wires.");
    }
  };

  const saveWire = async (wire: Wire) => {
    try {
      await DataStore.save(wire);
    } catch {
      throw Error("Error saving wire.");
    }
  };

  const deleteWire = async (wire: Wire) => {
    try {
      await DataStore.delete(wire);
    } catch {
      throw Error("Error deleting wire.");
    }
  };

  const filterWires = (wires: Wire[]): Wire[] => {
    if (searchString) {
      const filteredWires = wires.filter((w) => {
        return w.title
          .toLocaleLowerCase()
          .startsWith(searchString.toLocaleLowerCase());
      });
      return filteredWires;
    } else {
      return [...wires];
    }
  };

  const wireSorter = (w1: Wire, w2: Wire): number => {
    if (sortCategory === "Date") {
      const difference = moment(w1.date).diff(w2.date);

      if (sortDirection === "asc") {
        return difference;
      } else {
        return -difference;
      }
    } else {
      let index = 0;
      const w1Title = w1.title.toLocaleLowerCase();
      const w2Title = w2.title.toLocaleLowerCase();

      while (index < w1Title.length && index < w2Title.length) {
        let w1Char = w1Title.charCodeAt(index);
        let w2Char = w2Title.charCodeAt(index);
        let difference = w1Char - w2Char;

        if (sortDirection === "asc") {
          if (w1Char !== w2Char) {
            return difference;
          }
        } else {
          if (w1Char !== w2Char) {
            return -difference;
          }
        }

        index += 1;
      }

      let lengthDifference = w1Title.length - w2Title.length;

      if (sortDirection === "asc") {
        return lengthDifference;
      } else {
        return -lengthDifference;
      }
    }
  };

  const sortWires = (wires: Wire[]): Wire[] => {
    const sortedWires = [...wires].sort(wireSorter);
    return sortedWires;
  };

  useEffect(() => {
    fetchWires();
  }, []);

  const sortCategoryChangeHandler = useCallback((
    event: SelectChangeEvent<string>,
  ) => {
    setSortCategory(event.target.value);
  }, []);

  const sortDirectionChangeHandler = useCallback(() => {
    setSortDirection((previousValue: string) => {
      if (previousValue === "asc") {
        return "desc";
      } else {
        return "asc";
      }
    });
  }, []);

  const searchChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setSearchString(event.target.value);
    }, 500);
  }, []);

  const newWireClickHandler = useCallback(() => {
    setWireFormIsOpen(true);
  }, []);

  const closeWireFormHandler = useCallback(() => {
    setWireFormIsOpen(false);
  }, []);

  const submitWireFormHander = useCallback(async (wire: Wire) => {
    await saveWire(wire);
    await fetchWires();
    setWireToEdit(null);
  }, []);

  const deleteWireHandler = useCallback(async (wire: Wire) => {
    await deleteWire(wire);
    await fetchWires();
  }, []);

  const editWireHandler = useCallback((wire: Wire) => {
    setWireToEdit(wire);
    setWireFormIsOpen(true);
  }, []);

  const filteredWires = filterWires(wires);
  const sortedWires = sortWires(filteredWires);
  const visibleWires = sortedWires;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Box sx={{ display: "flex" }}>
          <WireSearcher
            sx={{ mr: 1 }}
            onChange={searchChangeHandler}
          ></WireSearcher>
          <WireSorter
            category={sortCategory}
            direction={sortDirection}
            onCategoryChange={sortCategoryChangeHandler}
            onDirectionChange={sortDirectionChangeHandler}
          ></WireSorter>
        </Box>
        <Button
          onClick={newWireClickHandler}
          variant="outlined"
          startIcon={<AddIcon />}
        >
          New Wire
        </Button>
        <Portal container={modalContainerRef.current}>
          {wireFormIsOpen && (
            <WireForm
              wire={wireToEdit}
              closeHandler={closeWireFormHandler}
              submitHandler={submitWireFormHander}
            ></WireForm>
          )}
        </Portal>
      </Box>
      <Paper variant="outlined" square>
        <List sx={{ padding: 0 }}>
          {visibleWires.length === 0 && <Box sx={{p: 2, textAlign: 'center'}}>No wires found.</Box>}
          {visibleWires.length > 0 &&
            visibleWires.map((wire, index) => {
              return (
                <Fragment key={wire.id}>
                  <WireListItem
                    deleteHandler={deleteWireHandler}
                    editHandler={editWireHandler}
                    wire={wire}
                  ></WireListItem>
                  {index !== visibleWires.length - 1 && <Divider></Divider>}
                </Fragment>
              );
            })}
        </List>
      </Paper>
    </>
  );
};

export default WireList;
