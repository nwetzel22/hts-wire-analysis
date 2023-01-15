import WireListItem from "./WireListItem";
import styles from './WireList.module.css';

export interface Wire {
    id: number;
    title: string;
    date: Date;
}

const DUMMIES: Wire[] = [
    { title: "AMSC Amperium® 2G HTS", date: new Date(2014, 10, 30), id: 1 },
    { title: "AMSC Amperium® Type 8502-350 coil formulation 2G HTS", date: new Date(2019, 7, 1), id: 2 },
    { title: "AMSC Amperium® Type 8700 cable formulation 2G HTS", date: new Date(2017, 10, 4), id: 3 },
    { title: "AMSC Amperium® Type 8702 non-magnetic cable formulation 2G HTS", date: new Date(2017, 10, 4), id: 4 },
    { title: "Fujikura FESC 2G HTS", date: new Date(2021, 8, 18), id: 5},
    { title: "Fujikura FYSC 2G HTS", date: new Date(2021, 10, 28), id: 6 }
]

const WireList = () => {
    return (
        <ul className={styles['wire-list']}>
            {DUMMIES.map((d) => {
                return <WireListItem key={d.id} {...d}></WireListItem>
            })}
        </ul>
    );
}

export default WireList;