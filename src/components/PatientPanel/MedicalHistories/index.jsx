import React, { Fragment, useState, useEffect } from "react";
import request from "../../Request";
import MedicalHistory from "./MedicalHistory";
import Errors from "../../Errors";
import getTokenData from "../../GetTokenData";
import Popup from "../../Popup";
import MedicalHistoryDetails from "./MedicalHistoryDetails";
import Paginate from "../../Paginate";
import AddMedicalHistory from "./AddMedicalHistory";

const MedicalHistories = (id) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null);
    const [pageNumber, setPageNumber] = useState(0)
    const [buttonPopup, setButtonPopup] = useState(false)
    const [buttonAddPopup, setButtonAddPopup] = useState(false)
    const [selectedTestData, setSelectedTestData] = useState(null)

    useEffect(() => {
        handleChange()
    }, []);

    const handleChange = async () => {
        const token = getTokenData()
        if (token == null || !(["Administrator", "Lekarz"].includes(token.role))) {
            return
        }

        const url = '/api/MedicalHistory/showMedicalHistories/' + id.id
        const callback = (response) => {
            var newDataArr = response.data
            setData(null)
            setData(newDataArr)
            setError(null)
        }
        const errorCallback = (response) => {
            setError(response.data)
        }
        await request({ url: url, type: "GET" }, callback, errorCallback)
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
                Historia choroby:
                <Popup component={<AddMedicalHistory onSubmit={handleChange} id={id} />} trigger={buttonAddPopup} setTrigger={setButtonAddPopup} />
                <button onClick={() => setButtonAddPopup(true)}>Dodaj nowy wpis</button>
                {data != null ?
                    <Paginate pageNumberChanged={pageNumberChanged} pageNumber={pageNumber} data={data.map((medicalHistory) => <MedicalHistory key={medicalHistory.id} data={medicalHistory} onClick={onClick} />)} />
                    : null}

                {selectedTestData != null ?
                    <Popup component={<MedicalHistoryDetails onSubmit={handleChange} id={selectedTestData.id} data={selectedTestData}/>} trigger={buttonPopup} setTrigger={setButtonPopup} />
                    : null}
            </Fragment>
    );
}

export default MedicalHistories