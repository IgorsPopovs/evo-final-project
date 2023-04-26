import React, { useEffect, useState } from "react";
import {bettingTime} from "../../utils/Constant";
import {Text} from "@pixi/react";
import {textStyle} from "../../utils/Helper";

type BettingTimerProps = {
    onTimeout: () => void;
};

const BetTimer: React.FC<BettingTimerProps> = ({ onTimeout }) => {
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

    // return <div>{`Time left to bet: ${remainingSeconds} seconds`}</div>;
    return (
        <Text
            text={`Time left to bet: ${remainingSeconds} seconds`}
            anchor={0}
            x={0}
            y={0}
            style={textStyle}
        />
    );
};

export default BetTimer;
