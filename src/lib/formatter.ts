const CURRENCY_FORMATTER = new Intl.NumberFormat("en-FI", {
    currency: "EUR",
    style: "currency",
    minimumFractionDigits: 2,
})

export function formatCurrency(amount: number) {
    return CURRENCY_FORMATTER.format(amount)
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-FI")

export function formatNumber(number: number) {
    return NUMBER_FORMATTER.format(number)
}

export function discountPercentage(product: any): number {
    return product?.sale_price ? Math.round(
        ((Number(product?.price) - Number(product?.sale_price)) /
            Number(product?.price)) *
        100
    ) : 0;
}

export function convertToSubcurrency(amount: number, factor = 100) {
    return Math.round(amount * factor)
}