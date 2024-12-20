export const calculateAverage = (reviews: number[]): number => {
    return reviews.length === 0
        ? 0
        : reviews.reduce((sum, review) => sum + review, 0) / reviews.length
}