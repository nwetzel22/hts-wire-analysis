import { Box, Divider, List, Paper, SelectChangeEvent } from "@mui/material";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import WireListItem from "./WireListItem";
import WireSearcher from "./WireSearcher";
import WireSorter from "./WireSorter";

export interface Wire {
  id: number;
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
  const [wires, setWires] = useState<Wire[]>(DUMMIES);
  const [filteredWires, setFilteredWires] = useState<Wire[]>(wires);
  const [sortCategory, setSortCategory] = useState<string>("Date");
  const [sortDirection, setSortDirection] = useState<string>("asc");
  const [searchString, setSearchString] = useState<string>("");

  const wireSearcher = (searchInput: string) => {
    if (searchInput){
      const filteredWires = wires.filter((w) => {
        return w.title.toLocaleLowerCase().startsWith(searchInput.toLocaleLowerCase());
      });
      setFilteredWires(filteredWires);
    } else {
      setFilteredWires([...wires]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      wireSearcher(searchString);
    }, 500);

    return(() => {
      clearTimeout(timer);
    })
  }, [searchString]);

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
      while (index < w1.title.length && index < w2.title.length) {
        let w1Char = w1.title.charCodeAt(index);
        let w2Char = w2.title.charCodeAt(index);

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

      let lengthDifference = w1.title.length - w2.title.length;

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

  const searchChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  filteredWires.sort(wireSorter);

  return (
    <>
      <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
        <WireSearcher onChange={searchChangeHandler}></WireSearcher>
        <WireSorter
          category={sortCategory}
          direction={sortDirection}
          onCategoryChange={sortCategoryChangeHandler}
          onDirectionChange={sortDirectionChangeHandler}
        ></WireSorter>
      </Box>
      <Paper variant="outlined" square>
        <List sx={{ padding: 0 }}>
          {filteredWires.map((d, index) => {
            return (
              <Fragment key={d.id}>
                <WireListItem {...d}></WireListItem>
                {index !== filteredWires.length - 1 && <Divider></Divider>}
              </Fragment>
            );
          })}
        </List>
      </Paper>
    </>
  );
};

export default WireList;
