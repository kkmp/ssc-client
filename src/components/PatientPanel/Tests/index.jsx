import React, { Fragment, useState, useEffect } from "react";
import request from "../../Request";
import Test from "./Test";
import Errors from "../../Errors";
import Paginate from "../../Paginate";
import Popup from "../../Popup";
import TestDetails from "./TestDetails";

const Tests = (id) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [pageNumber, setPageNumber] = useState(0)
    const [buttonPopup, setButtonPopup] = useState(false)
    const [selectedTestData, setSelectedTestData] = useState(null)

    useEffect(() => {
        handleChange()
    }, []);

    const handleChange = async () => {
        const url = '/api/Test/showTests/' + id.id;
        const callback = (response) => {
            var newDataArr = response.data;
            setData(null) //<-----------------------------
            setData(newDataArr)
            setError(null)
        }
        const errorCallback = (response) => {
            setError(response.data)
        }
        await request({ url: url, type: "GET" }, callback, errorCallback);
    }

    const onClick = (data) => {
        setSelectedTestData(data)
        setButtonPopup(true)
    }

    const pageNumberChanged = (page) => {
        setPageNumber(page)
    }

    return (
        error != null ? <Errors data={error} /> :
            <Fragment>
                Testy:
                {data != null ?
                    <Paginate pageNumberChanged={pageNumberChanged} pageNumber={pageNumber} data={data.map((test) => <Test key={test.id} data={test} onClick={onClick} />)} />
                    : null}

                {selectedTestData != null ?
                    <Popup component={<TestDetails onSubmit={handleChange} id={selectedTestData.id} />} trigger={buttonPopup} setTrigger={setButtonPopup} />
                    : null}
            </Fragment>

    );
}

export default Tests