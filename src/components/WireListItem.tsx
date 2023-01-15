import { Wire } from "./WireList";
import styles from './WireListItem.module.css';

const WireListItem = (wire: Wire) => {
    return (
        <li className={styles['wire-list-item']}>
            <div>{wire.title}</div>
            <div>{wire.date.toDateString()}</div>
        </li>
    );
}

export default WireListItem;