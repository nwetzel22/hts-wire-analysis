import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Header from "./components/Layout/Header";
import WireList from "./components/Wires/WireList";

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Header></Header>
      <Box sx={{ p: 3 }}>
        <WireList></WireList>
      </Box>
    </LocalizationProvider>
  );
}
