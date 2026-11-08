import { useEffect, useState } from "react";

export default function Typewriter({ text, speed = 75, startDelay = 400, className = "" }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let i = 0;
        let interval = null;
        const timeout = setTimeout(() => {
            interval = setInterval(() => {
                i += 1;
                setCount(i);
                if (i >= text.length) clearInterval(interval);
            }, speed);
        }, startDelay);
        return () => {
            clearTimeout(timeout);
            if (interval) clearInterval(interval);
        };
    }, [text, speed, startDelay]);

    return (
        <span className={className} data-testid="typewriter-name" aria-label={text}>
            <span aria-hidden="true">{text.slice(0, count)}</span>
            <span className="tw-caret" aria-hidden="true" />
        </span>
    );
}
