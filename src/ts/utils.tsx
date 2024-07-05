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