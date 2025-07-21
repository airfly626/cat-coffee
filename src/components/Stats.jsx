import { calculateCoffeeStats, getTopFiveCoffees } from "../assets/js/index";
import { useAuth } from "../context/AuthContext";


function StatCard(props) {
    const { lg, title, children } = props;

    return (
        <div className={"col" + (lg ? ' w-100' : '')}>
            <div className="card text-bg-light h-100">
                <div className="card-body">
                    <h5 className="card-title fw-bolder">{title}</h5>
                    {children}
                </div>
            </div>
        </div>
    )
}


export default function Stats() {
    const { globalData } = useAuth();
    let coffeeConsumptionHistory = globalData;

    const stats = calculateCoffeeStats(coffeeConsumptionHistory);


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col mt-3">
                        <h2 className="fw-bolder lh-lg"><i className="fa-solid fa-chart-simple" /> 消費統計</h2>
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-sm-2 g-3">
                    <StatCard title="平均每日消費 (NTD)">
                        NTD<span className="fs-2 fw-medium">{stats.daily_price}</span>
                    </StatCard>
                    <StatCard title="總消費 (NTD)">
                        NTD<span className="fs-2 fw-medium">{stats.total_price}</span>
                    </StatCard>
                    <StatCard title="平均每日咖啡因">
                        <span className="fs-2 fw-medium">{stats.daily_caffeine}</span>毫克
                    </StatCard>
                    <StatCard title="平均每日消費杯數">
                        <span className="fs-2 fw-medium">{stats.average_coffees}</span>杯
                    </StatCard>
                </div>

                <div className="row">
                    <div className="col my-3 mt-4">
                        <table className="table table-hover table-light">
                            <thead>
                                <tr>
                                    <th>品名</th>
                                    <th>購買數量</th>
                                    <th>購買數量百分比</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getTopFiveCoffees(coffeeConsumptionHistory).map((coffee, coffeeIndex) => {
                                        return (
                                            <tr key={coffeeIndex}>
                                                <td>{coffee.coffeeName}</td>
                                                <td>{coffee.count}</td>
                                                <td>{coffee.percentage}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}