export const coffeeTransOptions = [
    { "name": "Espresso", "caffeine": 63, "cname": "義式濃縮咖啡", "price": 85, "cost": 35 },
    { "name": "Double Espresso", "caffeine": 126, "cname": "雙份濃縮咖啡", "price": 100, "cost": 40 },
    { "name": "Americano", "caffeine": 96, "cname": "義大利美式咖啡", "price": 115, "cost": 35 },
    { "name": "Cappuccino", "caffeine": 80, "cname": "卡布奇諾", "price": 140, "cost": 40 },
    { "name": "Latte", "caffeine": 80, "cname": "拿鐵", "price": 140, "cost": 45 },
    { "name": "Mocha", "caffeine": 90, "cname": "摩卡", "price": 155, "cost": 50 },
    { "name": "Macchiato", "caffeine": 85, "cname": "瑪奇朵", "price": 160, "cost": 40 },
    { "name": "Flat White", "caffeine": 130, "cname": "白咖啡", "price": 155, "cost": 40 },
    { "name": "Cortado", "caffeine": 85, "cname": "告爾多咖啡", "price": 140, "cost": 45 },
    { "name": "Red Eye", "caffeine": 159, "cname": "紅眼咖啡", "price": 130, "cost": 40 },
    { "name": "Iced Coffee (8oz)", "caffeine": 90, "cname": "精選冰咖啡", "price": 100, "cost": 35 },
    { "name": "Cold Brew (12oz)", "caffeine": 155, "cname": "冷萃咖啡(冰釀咖啡)", "price": 145, "cost": 40 },
    { "name": "Nitro Cold Brew (12oz)", "caffeine": 215, "cname": "氮氣冷萃咖啡", "price": 175, "cost": 40 },
    { "name": "Drip Coffee (12oz)", "caffeine": 120, "cname": "手沖咖啡", "price": 200, "cost": 50 },
    { "name": "Frappuccino", "caffeine": 95, "cname": "咖啡星冰樂", "price": 135, "cost": 35 },
    { "name": "Irish Coffee", "caffeine": 70, "cname": "愛爾蘭咖啡", "price": 240, "cost": 70 },
    { "name": "Affogato", "caffeine": 65, "cname": "阿法奇朵", "price": 140, "cost": 45 },
    { "name": "Decaf Coffee", "caffeine": 2, "cname": "低咖啡因咖啡", "price": 120, "cost": 35 },
    { "name": "Chai Latte", "caffeine": 40, "cname": "印度香料奶茶", "price": 160, "cost": 45 },
    { "name": "Matcha Latte", "caffeine": 70, "cname": "抹茶拿鐵", "price": 160, "cost": 55 },
    { "name": "Chocolate", "caffeine": 48, "cname": "巧克力", "price": 160, "cost": 50 },
    { "name": "English Breakfast Tea", "caffeine": 163, "cname": "英式早餐紅茶", "price": 120, "cost": 40 },
    { "name": "Chamomile Herbal Blend Tea", "caffeine": 0, "cname": "洋甘菊花草茶", "price": 120, "cost": 40 },
    { "name": "Rooibos Tea", "caffeine": 0, "cname": "南非國寶茶", "price": 120, "cost": 40 },
    { "name": "Alishan Oolong Tea", "caffeine": 110, "cname": "阿里山烏龍茶", "price": 150, "cost": 55 }
]


export function getCaffeineAmount(coffeeName) {
    const coffee = coffeeTransOptions.find(c => c.name === coffeeName)

    return coffee ? coffee.caffeine : 0
}


export function getCoffeeTransName(coffeeName) {
    const coffee = coffeeTransOptions.find(c => c.name === coffeeName)

    return coffee ? coffee.cname : coffeeName
}


export function getTopFiveCoffees(historyData) {
    const coffeeCount = {}

    for (const entry of Object.values(historyData)) {
        const coffeeName = entry.name

        if (coffeeCount[coffeeName]) {
            coffeeCount[coffeeName]++
        }
        else {
            coffeeCount[coffeeName] = 1
        }
    }

    const sortedCoffees = Object.entries(coffeeCount).sort((a, b) => b[1] - a[1])
    const totalCoffees = Object.values(coffeeCount).reduce((sum, count) => sum + count, 0)

    const topNumber = sortedCoffees.slice(0, 5).map(([coffeeName, count]) => {
        const percentage = ((count / totalCoffees) * 100).toFixed(2)

        return {
            coffeeName: getCoffeeTransName(coffeeName),
            count: count,
            percentage: percentage + '%'
        }
    })

    return topNumber
}


export function calculateCoffeeStats(coffeeConsumptionHistory) {
    const dailyStats = {}
    let totalCoffees = 0
    let totalCost = 0
    let totalPrice = 0
    let totalCaffeine = 0
    let totalDaysWithCoffee = 0

    for (const [timestamp, coffee] of Object.entries(coffeeConsumptionHistory)) {
        const date = new Date(parseInt(timestamp)).toISOString().split('T')[0] //YYYY-MM-DD
        const caffeine = getCaffeineAmount(coffee.name)
        const cost = parseFloat(coffee.cost)
        const price = parseFloat(coffee.price)

        if (!dailyStats[date]) {
            dailyStats[date] = { caffeine: 0, cost: 0, count: 0, price: 0 }
        }

        dailyStats[date].caffeine += caffeine
        dailyStats[date].cost += cost
        dailyStats[date].price += price
        dailyStats[date].count += 1

        totalCoffees += 1
        totalCost += cost
        totalPrice += price
    }

    const days = Object.keys(dailyStats).length;
    const dailyCaffeine = {};
    for (const [date, stats] of Object.entries(dailyStats)) {
        if (stats.caffeine > 0) {
            totalCaffeine += stats.caffeine
            totalDaysWithCoffee += 1;
        }
    }

    const averageDailyCaffeine = totalDaysWithCoffee > 0 ? (totalCaffeine / totalDaysWithCoffee).toFixed(2) : 0
    const averageDailyCost = totalDaysWithCoffee > 0 ? (totalCost / totalDaysWithCoffee).toFixed(2) : 0
    const averageDailyPrice = totalDaysWithCoffee > 0 ? (totalPrice / totalDaysWithCoffee).toFixed() : 0

    return {
        daily_caffeine: averageDailyCaffeine,
        daily_cost: averageDailyCost,
        daily_price: averageDailyPrice,
        average_coffees: (totalCoffees / days).toFixed(2),
        total_cost: totalCost.toFixed(2),
        total_price: totalPrice.toFixed(),
    };
}