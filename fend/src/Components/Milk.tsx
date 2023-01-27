import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../index.css"
import pic from "../images/milk.png";
import Navbar from './Navbar';


function Milk() {
    const [milkData, setMilkData] = useState([]);
    const [milkType, setMilkType] = useState('');
    const [searchMilk, setsearchMilk] = useState('');

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

            <Navbar />

            <div className='everythingWithoutNav'>

                <div className='searchAndFilter'>
                    <input className='inputForSearch' type="text" placeholder="Search" value={searchMilk} onChange={Search} />
                    <select className='selectForFilter' value={milkType} onChange={MilkType}>
                        <option value="">Filter</option>
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
                    <p className='storageAmount'>{sortedData.length} Products</p>
                </div>

                <div>

                    <div className='mainDiv'>
                        {sortedData.map((milk, index) => (
                            <Link className='Link' to={`/product/${milkData[index]["id"]}`}>
                                <div className='testing' key={index}>
                                    <div className='divImage'>
                                        <img src={pic} alt='pic' />
                                    </div>
                                    <div className='NameTypeStorage'>
                                        <div>{milk["name"]}</div>
                                        <div className='typeAndAmount'>
                                            <p>
                                                {milk["type"]}
                                            </p>

                                            {<p>
                                                {milk["storage"]} liters
                                            </p>}
                                        </div>

                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Milk;