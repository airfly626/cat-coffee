import { coffeeTransOptions } from "../assets/js/index";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";


export default function CoffeeForm(props) {
    const { isAuthenticated } = props;

    const [selectedCoffee, setSeletedCoffee] = useState(null);
    const [showCoffeeTypes, setShowCoffeeTypes] = useState(false);
    const [coffeeCost, setCoffeeCost] = useState(0);
    const [coffeePrice, setCoffeePrice] = useState(0);

    const { globalData, setGlobalData, globalUser } = useAuth();


    async function handleSubmitForm() {

        if (!isAuthenticated) {
            $('#exampleModal').modal('show');

            return;
        }


        if (!selectedCoffee) {
            return;
        }


        try {
            const newGlobalData = {
                ...(globalData || {})
            }

            const timestamp = Date.now();
            const newData = {
                name: selectedCoffee,
                cost: coffeeCost,
                price: coffeePrice,
            };

            newGlobalData[timestamp] = newData;

            setGlobalData(newGlobalData);

            const userRef = doc(db, 'users', globalUser.uid);
            const res = await setDoc(userRef, {
                [timestamp]: newData
            }, {
                    merge: true
                });


            setShowCoffeeTypes(false);
            setSeletedCoffee(null);
            setCoffeeCost(0);
            setCoffeePrice(0);
        }
        catch (err) {
            console.log(err.message);
        }
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col py-3">
                        <h2 className="fw-bolder lh-lg"><i className="fa-solid fa-circle-info" /> 每日推薦</h2>
                        <div className="coffee-grid">
                            {
                                coffeeTransOptions.slice(12, 15).map((option, optionIndex) => {
                                    return (
                                        <button
                                            type="button"
                                            className={"btn " + (option.name === selectedCoffee ? 'btn-success ' : 'btn-outline-success ') + "m-2 d-flex flex-column justify-content-center align-items-center"}
                                            key={optionIndex}
                                            onClick={() => {
                                                setSeletedCoffee(option.name);
                                                setCoffeeCost(option.cost);
                                                setCoffeePrice(option.price);
                                                setShowCoffeeTypes(false);
                                            }}
                                        >
                                            <p className="fw-bolder">{option.cname}</p>
                                            <p className="mb-0">NTD{option.price}</p>
                                            <span className="fs-7">咖啡因含量{option.caffeine}毫克</span>
                                        </button>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col py-3">
                        <h2 className="fw-bolder lh-lg"><i className="fa-solid fa-wine-glass fa-lg" /> 飲品</h2>
                        <h4 className="fw-bolder">選擇品項</h4>
                        <div className="coffee-grid">
                            {
                                coffeeTransOptions.slice(0, 5).map((option, optionIndex) => {
                                    return (
                                        <button
                                            type="button"
                                            className={"btn " + (option.name === selectedCoffee ? 'btn-vividorange ' : 'btn-outline-vividorange ') + "m-2 d-flex flex-column justify-content-center align-items-center"}
                                            key={optionIndex}
                                            onClick={() => {
                                                setSeletedCoffee(option.name);
                                                setCoffeeCost(option.cost);
                                                setCoffeePrice(option.price);
                                                setShowCoffeeTypes(false);
                                            }}
                                        >
                                            <p className="fw-bolder">{option.cname}</p>
                                            <p className="mb-0">NTD{option.price}</p>
                                            <span className="fs-7">咖啡因含量{option.caffeine}毫克</span>
                                        </button>
                                    );
                                })
                            }

                            <button
                                type="button"
                                className={"btn " + (showCoffeeTypes ? 'btn-vividorange ' : 'btn-outline-vividorange ') + "m-2 d-flex flex-column justify-content-center align-items-center"}
                                onClick={() => {
                                    setSeletedCoffee(null);
                                    setShowCoffeeTypes(true);
                                }}
                            >
                                <p className="fw-bolder">其他品項</p>
                                n/a
                            </button>
                        </div>

                        {
                            showCoffeeTypes &&
                            <select className="form-select mt-2" id="coffeeOptions"
                                onChange={(e) => {
                                    let currentCoffee = e.target.value.split("&");

                                    setSeletedCoffee(currentCoffee[0]);
                                    setCoffeeCost(parseInt(currentCoffee[1]));
                                    setCoffeePrice(parseInt(currentCoffee[2]));
                                }}
                            >
                                <option value={null}>選擇其他飲品</option>
                                {
                                    coffeeTransOptions.slice(5).map((option, optionIndex, a, b) => {
                                        let optionName = `${option.name}&${option.cost}&${option.price}`;

                                        return (
                                            <option key={optionIndex} value={optionName}>
                                                {option.cname} (NTD{option.price}、咖啡因含量{option.caffeine}毫克)
                                        </option>
                                        )
                                    })
                                }
                            </select>
                        }

                        <button type="button" className="btn btn-outline-vividorange my-4 mb-3"
                            onClick={handleSubmitForm}
                        >
                            送出訂單
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}