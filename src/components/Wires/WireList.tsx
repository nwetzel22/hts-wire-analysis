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
import {
  ChangeEvent,
  Fragment,
  RefObject,
  useContext,
  useEffect,
  useState,
} from "react";
import AppContext from "../../contexts/AppContext";
import WireForm from "./WireForm";
import WireListItem from "./WireListItem";
import WireSearcher from "./WireSearcher";
import WireSorter from "./WireSorter";

export interface Wire {
  id: number | null;
  title: string;
  date: Date;
}

const DUMMIES: Wire[] = [
  { title: "AMSC Amperium® 2G HTS", date: new Date(2014, 10, 30), id: 1 },
  {
    title: "AMSC Amperium® Type 8502-350 coil formulation 2G HTS",
    date: new Date(2019, 7, 1),
    id: 2,
  },
  {
    title: "AMSC Amperium® Type 8700 cable formulation 2G HTS",
    date: new Date(2017, 10, 4),
    id: 3,
  },
  {
    title: "AMSC Amperium® Type 8702 non-magnetic cable formulation 2G HTS",
    date: new Date(2017, 10, 4),
    id: 4,
  },
  { title: "Fujikura FESC 2G HTS", date: new Date(2021, 8, 18), id: 5 },
  { title: "Fujikura FYSC 2G HTS", date: new Date(2021, 10, 28), id: 6 },
  { title: "InnoST 1G HTS", date: new Date(2019, 10, 22), id: 7 },
  { title: "Nexans Bi-2212", date: new Date(2016, 8, 25), id: 8 },
  { title: "Samri 2G HTS", date: new Date(2019, 4, 29), id: 9 },
  {
    title: "Shanghai Creative Superconductor Technologies 2G HTS",
    date: new Date(2017, 8, 15),
    id: 10,
  },
  {
    title: "Shanghai Superconductor High Field Low Temperature 2G HTS",
    date: new Date(2022, 2, 20),
    id: 11,
  },
  {
    title: "Shanghai Superconductor Low Field High Temperature 2G HTS",
    date: new Date(2022, 2, 20),
    id: 12,
  },
  { title: "STI Conductus® 2G HTS", date: new Date(2016, 8, 25), id: 13 },
  {
    title: "Sumitomo new type H DI-BSCCO®",
    date: new Date(2014, 10, 6),
    id: 14,
  },
  { title: "SuNAM HAN04200 2G HTS", date: new Date(2017, 7, 7), id: 15 },
  { title: "SuNAM HAN04200 2G HTS", date: new Date(2017, 7, 7), id: 16 },
  { title: "SuperOx GdBCO 2G HTS", date: new Date(2021, 2, 3), id: 17 },
  { title: "SuperOx YBCO 2G HTS", date: new Date(2021, 2, 4), id: 18 },
  {
    title: "SuperPower Advanced Pinning 2G HTS",
    date: new Date(2021, 3, 1),
    id: 19,
  },
  { title: "THEVA Pro-Line 2G HTS", date: new Date(2019, 2, 19), id: 20 },
];

const WireList = () => {
  const [allWires, setAllWires] = useState<Wire[]>(DUMMIES);
  const [processedWires, setProcessedWires] = useState<Wire[]>(allWires);
  const [sortCategory, setSortCategory] = useState<string>("Date");
  const [sortDirection, setSortDirection] = useState<string>("asc");
  const [searchString, setSearchString] = useState<string>("");
  const [wireFormIsOpen, setWireFormIsOpen] = useState(false);
  const [wireToEdit, setWireToEdit] = useState<Wire | null>(null);

  const appContext = useContext(AppContext);
  const modalContainerRef = appContext.modalContainerRef as RefObject<Element>;

  useEffect(() => {
    const timer = setTimeout(() => {
      const _filteredWires = filterWires(allWires);
      const _sortedWires = sortWires(_filteredWires);
      setProcessedWires(_sortedWires);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchString]);

  useEffect(() => {
    const _filteredWires = filterWires(allWires);
    const _sortedWires = sortWires(_filteredWires);
    setProcessedWires(_sortedWires);
  }, [allWires]);

  useEffect(() => {
    const _sortedWires = sortWires(processedWires);
    setProcessedWires(_sortedWires);
  }, [sortCategory, sortDirection]);

  const sortCategoryChangeHandler = (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => {
    setSortCategory(event.target.value);
  };

  const sortDirectionChangeHandler = () => {
    setSortDirection((previousValue: string) => {
      if (previousValue === "asc") {
        return "desc";
      } else {
        return "asc";
      }
    });
  };

  const searchChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const newWireClickHandler = () => {
    setWireFormIsOpen(true);
  };

  const closeWireFormHandler = () => {
    setWireFormIsOpen(false);
  };

  const submitWireFormHander = (wire: Wire) => {
    const unmatchedWires = allWires.filter((w) => wire.id !== w.id);
    const wires = [...unmatchedWires, wire];
    setWireToEdit(null);
    setAllWires(wires);
  };

  const deleteWireHandler = (wire: Wire) => {
    const _wires = allWires.filter((w) => w.id !== wire.id);
    setAllWires(_wires);
  };

  const editWireHandler = (wire: Wire) => {
    setWireToEdit(wire);
    setWireFormIsOpen(true);
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

  const sortWires = (wires: Wire[]): Wire[] => {
    const sortedWires = [...wires.sort(wireSorter)];
    return sortedWires;
  };

  const wireSorter = (w1: Wire, w2: Wire): 1 | 0 | -1 => {
    if (sortCategory === "Date") {
      const difference = w1.date.getTime() - w2.date.getTime();
      if (sortDirection === "asc") {
        if (difference > 0) {
          return -1;
        } else if (difference < 0) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (difference > 0) {
          return 1;
        } else if (difference < 0) {
          return -1;
        } else {
          return 0;
        }
      }
    } else {
      let index = 0;
      const w1Title = w1.title.toLocaleLowerCase();
      const w2Title = w2.title.toLocaleLowerCase();

      while (index < w1Title.length && index < w2Title.length) {
        let w1Char = w1Title.charCodeAt(index);
        let w2Char = w2Title.charCodeAt(index);

        if (sortDirection === "asc") {
          if (w1Char > w2Char) {
            return -1;
          } else if (w1Char < w2Char) {
            return 1;
          }
        } else {
          if (w1Char > w2Char) {
            return 1;
          } else if (w1Char < w2Char) {
            return -1;
          }
        }

        index += 1;
      }

      let lengthDifference = w1Title.length - w2Title.length;

      if (sortDirection === "asc") {
        if (lengthDifference < 0) {
          return 1;
        } else if (lengthDifference > 0) {
          return -1;
        } else {
          return 0;
        }
      } else {
        if (lengthDifference < 0) {
          return -1;
        } else if (lengthDifference > 0) {
          return 1;
        } else {
          return 0;
        }
      }
    }
  };

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
          {processedWires.map((wire, index) => {
            return (
              <Fragment key={wire.id}>
                <WireListItem
                  deleteHandler={deleteWireHandler}
                  editHandler={editWireHandler}
                  wire={wire}
                ></WireListItem>
                {index !== processedWires.length - 1 && <Divider></Divider>}
              </Fragment>
            );
          })}
        </List>
      </Paper>
    </>
  );
};

export default WireList;
