export const size = (min: number, middle: number, max: number) => {
    return Math.max(min, Math.min(middle, max))
}