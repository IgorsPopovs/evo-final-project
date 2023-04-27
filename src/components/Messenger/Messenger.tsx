import React, {useContext} from 'react';
import {RootStoreContext} from "../../App";
import {observer} from "mobx-react";
import {GameStatus} from "../../utils/Constant";
import "./Messenger.css";


const Messenger: React.FC = () => {
    const rootStore = useContext(RootStoreContext);

    return (
        <div className='message-container'>
            <p className='message-text'>{rootStore.messengerStore.getMessage}</p>
        </div>
    );
}

export default observer(Messenger);