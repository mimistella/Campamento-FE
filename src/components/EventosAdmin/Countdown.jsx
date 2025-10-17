import { useEffect, useState } from "react";

function calculateTimeLeft(targetDate) {
        const difference = +new Date(targetDate) - +new Date();
        if (difference <= 0) return null;

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }

export default function Countdown({ targetDate }) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!timeLeft) return <span>¡Tiempo terminado!</span>;

    return (
        <div className="flex gap-2 text-lg font-bold text-blue-800">
            <span>{timeLeft.days}d</span>
            <span>{timeLeft.hours}h</span>
            <span>{timeLeft.minutes}m</span>
        </div>
    );
}
