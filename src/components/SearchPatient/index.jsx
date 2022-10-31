import React, { Fragment, useState } from "react";
import request from "../Request";
import Patient from "../Patient/Patient";
import Errors from "../Errors";
import InfiniteScroll from "react-infinite-scroller";

const SearchPatient = () => {
    const [option, setOption] = useState("surname");
    const [orderType, setOrderType] = useState("ascending");
    const [maleChecked, setMaleChecked] = useState(false);
    const [femaleChecked, setFemaleChecked] = useState(false);
    const [searchName, setSearchName] = useState("");
    const [pageNr, setPageNr] = useState(1);
    const [data, setData] = useState([])
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [hasMoreItems, setHasMoreItems] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setData([])
        setPageNr(1)
        setHasMoreItems(true)
    };

    const handleSearch = async () => {
        let sex = ""
        if (maleChecked && femaleChecked) {
            sex = "both"
        }
        else if (maleChecked) {
            sex = "male"
        }
        else if (femaleChecked) {
            sex = "female"
        }
        else {
            setError({ errors: { message: ["Nie wybrano żadnej płci"] } })
            setHasMoreItems(false)
            return
        }

        if (fetching) {
            return
        }

        setFetching(true)
        const url = '/api/Patient/filterPatients/' + pageNr + '/' + option + '/' + orderType + '/' + sex + '/' + searchName
        const callback = (response) => {
            var newDataArr = Object.keys(response.data).map((key) => response.data[key]);
            setError(null)
            if (newDataArr.length > 0) {
                setData([...data, ...newDataArr])
                setHasMoreItems(true);
            }
            else {
                setHasMoreItems(false);
            }
            setPageNr(pageNr + 1)
            setFetching(false)
        }
        const errorCallback = (response) => {
            setError(response.data)
            setFetching(false)
            setHasMoreItems(false)
        }
        await request({ url: url, type: "GET" }, callback, errorCallback);

    }

    const handleChangeOption = (event) => {
        setOption(event.target.value)
    }

    const handleChangeOrderType = (event) => {
        setOrderType(event.target.value)
    }

    const loader = (
        <div className="spinner-border" role="status"></div>
    );

    return (<Fragment>
        {error != null ? <Errors data={error} /> : null}
        <form onSubmit={handleSubmit} className="mt-5">
            <h2>Wyszukiwarka czy coś</h2>
            <input type="text" name="search" id="search" value={searchName} onChange={({ target }) => setSearchName(target.value)} />
            <h3>Filtry</h3>
            Sortowanie
            <div>
                <input value="surname" type="radio" name="option" id="surname" checked={option === 'surname'} onChange={handleChangeOption} />Nazwisko
                <input value="birthdate" type="radio" name="option" id="birthdate" checked={option === 'birthdate'} onChange={handleChangeOption} />Data urodzenia
            </div>
            Kolejność sortowania
            <div>
                <input value="ascending" type="radio" name="orderType" id="ascending" checked={orderType === 'ascending'} onChange={handleChangeOrderType} />Rosnąco
                <input value="descending" type="radio" name="orderType" id="descending" checked={orderType === 'descending'} onChange={handleChangeOrderType} />Malejąco
            </div>
            Płeć
            <div>
                <input type="checkbox" name="sex" id="female" checked={femaleChecked} onChange={x => setFemaleChecked(!femaleChecked)} />Kobieta
            </div>
            <div>
                <input type="checkbox" name="sex" id="male" checked={maleChecked} onChange={x => setMaleChecked(!maleChecked)} />Mężczyzna
            </div>
            <button type="submit">Szukaj</button>
        </form>
        Wyniki wyszukiwania:
        {/*data.map((patient) => <Patient key={patient["id"]} data={patient} />)*/}

        <InfiniteScroll
            loadMore={handleSearch}
            hasMore={hasMoreItems}
            offset={50}
            loader={loader}>
            <ul>
                {data.map(patient => (
                    <li key={patient.id}>
                        <Patient key={patient.id} data={patient} />
                    </li>
                ))}
            </ul>
        </InfiniteScroll>
    </Fragment>
    );
}

export default SearchPatient