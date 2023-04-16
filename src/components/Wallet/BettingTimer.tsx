import { useEffect, useState } from "react";
import {bettingTime} from "../../utils/Constant";

type BettingTimerProps = {
    onTimeout: () => void;
};

const BettingTimer: React.FC<BettingTimerProps> = ({ onTimeout }) => {
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

    return <div>{`Time left to bet: ${remainingSeconds} seconds`}</div>;
};

export default BettingTimer;
