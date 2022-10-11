import React, { Fragment, useState } from "react";
import request from "../Request";
import User from "../User/User";
import Errors from "../Errors";

const SearchUser = () => {
    const [option, setOption] = useState("surname");
    const [orderType, setOrderType] = useState("ascending");
    const [searchName, setSearchName] = useState("");
    const [pageNr, setPageNr] = useState(1);
    const [data, setData] = useState([])
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = '/api/User/filterUsers/' + pageNr + '/' + option + '/' + orderType + '/' + searchName
        const callback = (response) => {
            var newDataArr = Object.keys(response.data).map((key) => response.data[key]);
            setData(newDataArr)
            setError(null)
        }
        const errorCallback = (response) => {
            setError(response.data)
        }

        await request({ url: url, type: "GET" }, callback, errorCallback);
    };

    const handleChangeOption = (event) => {
        setOption(event.target.value)
    }

    const handleChangeOrderType = (event) => {
        setOrderType(event.target.value)
    }

    return (<Fragment>
        {error != null ? <Errors data={error} /> : null}
        <form onSubmit={handleSubmit} className="mt-5">
            <h2>Wyszukiwarka czy coś</h2>
            <input type="text" name="search" id="search" value={searchName} onChange={({ target }) => setSearchName(target.value)} />
            <h3>Filtry</h3>
            Sortowanie
            <div>
                <input value="surname" type="radio" name="option" id="surname" checked={option === 'surname'} onChange={handleChangeOption} />Nazwisko
                <input value="email" type="radio" name="option" id="email" checked={option === 'email'} onChange={handleChangeOption} />Adres e-mail
                <input value="active" type="radio" name="option" id="active" checked={option === 'active'} onChange={handleChangeOption} />Aktywność
            </div>
            Kolejność sortowania
            <div>
                <input value="ascending" type="radio" name="orderType" id="ascending" checked={orderType === 'ascending'} onChange={handleChangeOrderType} />Rosnąco
                <input value="descending" type="radio" name="orderType" id="descending" checked={orderType === 'descending'} onChange={handleChangeOrderType} />Malejąco
            </div>
            <button type="submit">Szukaj</button>
        </form>
        {data.map((user) => <User key={user["id"]} data={user} showButton={true}/>)}
    </Fragment>
    );
}

export default SearchUser