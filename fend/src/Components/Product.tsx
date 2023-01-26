import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import "../index.css";

type Props = {
    id: string;
}

const Product: React.FunctionComponent<Props> = () => {
    const [milkData, setMilkData] = useState<any>({});
    const [amount, setamount] = useState<number>(1);
    let { id } = useParams();

    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            const response = await fetch(`https://localhost:7023/api/milk/${id}`);
            setMilkData(response.json());
        };
        fetchData().then(r => console.log(r));
    }, [id]);

    const handleOrder = async () => {
        const storage = milkData.storage - amount;
        try {
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(storage)
            }
            const response = await fetch(`https://localhost:7023/api/milk/${id}`, requestOptions);
            if (response.ok) {
                setMilkData({ ...milkData, storage: storage });

                alert(`Ordered ${amount} liter of ${milkData.name}`);
            } else {
                alert('Error');
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="bla">
            
                <div>
                    <div>
                        <div>{milkData.name}</div>
                        <p>
                            Type: {milkData.type}
                        </p>
                        <p>
                            Storage: {milkData.storage} liter
                        </p>
                        {<>
                            <label>
                                Quantity:
                            </label>
                            <input type="range" min={1} max={milkData.storage} value={amount} onChange={(e) => setamount(e.target.valueAsNumber)} />
                            <div>{amount} liter</div>
                            <button className='hello'onClick={handleOrder}>
                                Order
                            </button>
                        </>}
                    </div>
                </div>
            
        </div>
    );
};

export default Product;