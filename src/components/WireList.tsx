import WireListItem from './WireListItem';
import styles from './WireList.module.css';
import { Paper, List, Divider } from '@mui/material';

export interface Wire {
    id: number;
    title: string;
    date: Date;
}

const DUMMIES: Wire[] = [
    { title: 'AMSC Amperium® 2G HTS', date: new Date(2014, 10, 30), id: 1 },
    { title: 'AMSC Amperium® Type 8502-350 coil formulation 2G HTS', date: new Date(2019, 7, 1), id: 2 },
    { title: 'AMSC Amperium® Type 8700 cable formulation 2G HTS', date: new Date(2017, 10, 4), id: 3 },
    { title: 'AMSC Amperium® Type 8702 non-magnetic cable formulation 2G HTS', date: new Date(2017, 10, 4), id: 4 },
    { title: 'Fujikura FESC 2G HTS', date: new Date(2021, 8, 18), id: 5 },
    { title: 'Fujikura FYSC 2G HTS', date: new Date(2021, 10, 28), id: 6 },
    { title: 'InnoST 1G HTS', date: new Date(2019, 10, 22), id: 7 },
    { title: 'Nexans Bi-2212', date: new Date(2016, 8, 25), id: 8 },
    { title: 'Samri 2G HTS', date: new Date(2019, 4, 29), id: 9 },
    { title: 'Shanghai Creative Superconductor Technologies 2G HTS', date: new Date(2017, 8, 15), id: 10 },
    { title: 'Shanghai Superconductor High Field Low Temperature 2G HTS', date: new Date(2022, 2, 20), id: 11 },
    { title: 'Shanghai Superconductor Low Field High Temperature 2G HTS', date: new Date(2022, 2, 20), id: 12 },
    { title: 'STI Conductus® 2G HTS', date: new Date(2016, 8, 25), id: 13 },
    { title: 'Sumitomo new type H DI-BSCCO®', date: new Date(2014, 10, 6), id: 14 },
    { title: 'SuNAM HAN04200 2G HTS', date: new Date(2017, 7, 7), id: 15 },
    { title: 'SuNAM HAN04200 2G HTS', date: new Date(2017, 7, 7), id: 16 },
    { title: 'SuperOx GdBCO 2G HTS', date: new Date(2021, 2, 3), id: 17 },
    { title: 'SuperOx YBCO 2G HTS', date: new Date(2021, 2, 4), id: 18 },
    { title: 'SuperPower Advanced Pinning 2G HTS', date: new Date(2021, 3, 1), id: 19 },
    { title: 'THEVA Pro-Line 2G HTS', date: new Date(2019, 2, 19), id: 20 }
]

const WireList = () => {
    return (
        <Paper variant='outlined' square>
            <List sx={{padding: 0}}>
                {DUMMIES.map((d, index) => {
                    return (
                        <>
                            <WireListItem key={d.id} {...d}></WireListItem>
                            {index !== DUMMIES.length - 1 && <Divider></Divider>}
                        </>
                    );
                })}
            </List>
        </Paper>
    );
}

export default WireList;