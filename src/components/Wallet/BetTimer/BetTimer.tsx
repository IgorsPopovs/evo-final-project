import {useEffect, useState} from "react";
import {bettingTime} from "../../../utils/Constant";
import "./BetTimer.css";
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type BettingTimerProps = {
    onTimeout: () => void;
};

const BetTimer: React.FC<BettingTimerProps> = ({onTimeout}) => {
    const [remainingSeconds, setRemainingSeconds] = useState<number>(bettingTime);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (remainingSeconds > 0) {
            timeout = setTimeout(() => {
                setRemainingSeconds(remainingSeconds - 1);
            }, 1000);
        } else {
            onTimeout();
        }

        return () => clearTimeout(timeout);
    }, [remainingSeconds, onTimeout]);

    return (
        <div className="bet-timer-container">
            <CircularProgressbar
                value={remainingSeconds}
                maxValue={bettingTime}
                text={`${remainingSeconds} s`}
                styles={buildStyles({
                    trailColor: 'rgba(214,214,214,0.18)',
                    pathColor: `rgb(255, 255, 255)`,
                    textColor: '#ffffff',
                })}
            />
        </div>
    );


};

export default BetTimer;
