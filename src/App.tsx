import { Box } from '@mui/material';
import * as React from 'react';
import AppHeader from './components/AppHeader';
import WireList from './components/WireList';

export default function App() {
  return (
    <>
      <AppHeader></AppHeader>
      <Box sx={{p: 3}}>
        <WireList></WireList>
      </Box>
    </>
  );
}