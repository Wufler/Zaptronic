import prisma from "@/lib/prisma"

export async function getOrders() {
    const data = await prisma.orders.aggregate({
        _sum: { price_paid: true },
        _count: true,
    })
    return {
        paid: data._sum.price_paid || 0,
        numberOfSales: data._count,
    }
}
export async function getUserData() {
    const [userCount, orderData] = await Promise.all([
        prisma.user.count(),
        prisma.orders.aggregate({
            _sum: { price_paid: true },
        }),
    ])

    return {
        userCount,
        averageValuePerUser:
            userCount === 0 ? 0 : (orderData._sum.price_paid || 0) / userCount,
    }
}