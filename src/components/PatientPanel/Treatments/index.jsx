import React, { Fragment, useState, useEffect } from "react";
import request from "../../Request";
import Treatment from "./Treatment";
import Errors from "../../Errors";
import Paginate from "../../Paginate";
import Popup from "../../Popup";
import TreatmentDetails from "./TreatmentDetails";
import getTokenData from "../../GetTokenData";

const Treatments = (id) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null);
    const [pageNumber, setPageNumber] = useState(0)
    const [buttonPopup, setButtonPopup] = useState(false)
    const [selectedTestData, setSelectedTestData] = useState(null)

    useEffect(() => {
        handleChange()
    }, []);

    const handleChange = async () => {
        const token = getTokenData()
        if (token == null || !(["Administrator", "Lekarz"].includes(token.role))) {
            return
        }
        
        const url = '/api/Treatment/showTreatments/' + id.id;
        const callback = (response) => {
            var newDataArr = response.data;
            setData(null)
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
                Leczenie:
                {data != null ?
                    <Paginate pageNumberChanged={pageNumberChanged} pageNumber={pageNumber} data={data.map((treatment) => <Treatment key={treatment.id} data={treatment} onClick={onClick} />)} />
                    : null}

                {selectedTestData != null ?
                    <Popup component={<TreatmentDetails onSubmit={handleChange} id={selectedTestData.id} showEdit={true}/>} trigger={buttonPopup} setTrigger={setButtonPopup} />
                    : null}
            </Fragment>
    );
}

export default Treatments