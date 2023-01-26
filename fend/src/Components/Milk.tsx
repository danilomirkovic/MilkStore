import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../index.css"


function Milk() {
    const [milkData, setMilkData] = useState([]);
    const [searchMilk, setsearchMilk] = useState('');
    const [milkType, setMilkType] = useState('');

    useEffect(() => {
        fetch('https://localhost:7023/api/milk')
            .then(response => response.json())
            .then(data => setMilkData(data.results));
    }, []);

    const Search = (e: React.ChangeEvent<HTMLInputElement>) => {
        setsearchMilk(e.target.value);
    };

    const MilkType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMilkType(e.target.value);
    };

    let sortedData = milkData;

    if (searchMilk !== '') {
        sortedData = sortedData.filter(milk => {
            /* @ts-ignore */
            return milk["name"].toLowerCase().includes(searchMilk.toLowerCase());
        });
    }

    if (milkType !== '') {
        sortedData = sortedData.filter(milk => {
            return milk["type"] === milkType;
        });
    }

    return (
        <div>
            <div>
                <input type="text" placeholder="Search" value={searchMilk} onChange={Search}/>
                <select value={milkType} onChange={MilkType}>
                    <option value="">All Types</option>
                    <option value="Whole milk">Whole Milk</option>
                    <option value="Oat milk">Oat Milk</option>
                    <option value="Pea milk">Pea Milk</option>
                    <option value="Almond milk">Almond Milk</option>
                    <option value="Rice milk">Rice Milk</option>
                    <option value="Coconut milk">Coconut Milk</option>
                    <option value="Soy milk">Soy Milk</option>
                    <option value="Walnut milk">Walnut Milk</option>
                    <option value="Macadamia milk">Macadamia Milk</option>
                    <option value="Hemp milk">Hemp Milk</option>
                    <option value="Cashew milk">Cashew Milk</option>
                </select>
            </div>
            <div>
                <h1>{sortedData.length} Products</h1>
            </div>
            <div>
                <img src='' alt='pic'/>
            <div className='sir'>
                {sortedData.map((milk, index) => (
                    <div key={index}>
                        
                        <div>
                            <div>{milk["name"]}</div>
                            <p>
                                Type: {milk["type"]}
                            </p>
                            <div>
                                { <p>
                                    Storage: {milk["storage"]} liters
                                </p>}
                            </div>

                        </div>
                        <Link to={`/product/${milkData[index]["id"]}`}>
                            <div>
                                <button>
                                    Check Out
                                </button>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default Milk;