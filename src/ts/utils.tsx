
// hooks/useMediaQuery.js
import { useState, useEffect } from 'react';

export const size = (min: number, middle: number, max: number) => {
    return Math.max(min, Math.min(middle, max))
}

type transitionProps = { delay: number };

export const transition = ({ delay }: transitionProps) => {
    return {
        type: "spring",
        damping: 20,
        stiffness: 65,
        restDelta: 0.001,
        delay: delay
    }
}


export const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState<boolean | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const media = window.matchMedia(query);
            setMatches(media.matches);

            const listener = () => setMatches(media.matches);
            media.addEventListener('change', listener);
            return () => media.removeEventListener('change', listener);
        }
    }, [query]);

    return matches;
};


export const useCustomCursor = (hovered: any, cursorType: any) => {
    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = cursorType;
        } else {
            document.body.style.cursor = 'default';
        }
        return () => {
            document.body.style.cursor = 'default';
        };
    }, [hovered, cursorType]);
};


