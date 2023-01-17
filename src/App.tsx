import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useRef } from "react";
import Header from "./components/Layout/Header";
import WireList from "./components/Wires/WireList";
import AppContext, { _AppContext } from "./contexts/AppContext";

export default function App() {
  const modalContainerRef = useRef<unknown>();

  const appContext: _AppContext = {
    modalContainerRef: modalContainerRef
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <AppContext.Provider value={appContext}>
        <Header></Header>
        <Box sx={{ p: 3 }}>
          <WireList></WireList>
        </Box>
        <Box ref={modalContainerRef}></Box>
      </AppContext.Provider>
    </LocalizationProvider>
  );
}
