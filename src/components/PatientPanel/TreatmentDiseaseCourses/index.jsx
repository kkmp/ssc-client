import React, { Fragment, useState, useEffect } from "react";
import request from "../../Request";
import TreatmentDiseaseCourse from "./TreatmentDiseaseCourse";
import Errors from "../../Errors";
import TreatmentDiseaseCourseDetails from "./TreatmentDiseaseCourseDetails";
import Popup from "../../Popup";
import Paginate from "../../Paginate";
import getTokenData from "../../GetTokenData";

const TreatmentDiseaseCourses = (id) => {
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

        const url = '/api/TreatmentDiseaseCourse/showTreatmentDiseaseCourses/' + id.id;
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
                Powikłania:
                {data != null ?
                    <Paginate pageNumberChanged={pageNumberChanged} pageNumber={pageNumber} data={data.map((treatmentDiseaseCourse) => <TreatmentDiseaseCourse key={treatmentDiseaseCourse.id} data={treatmentDiseaseCourse} onClick={onClick} />)} />
                    : null}

                {selectedTestData != null ?
                    <Popup component={<TreatmentDiseaseCourseDetails onSubmit={handleChange} id={selectedTestData.id} />} trigger={buttonPopup} setTrigger={setButtonPopup} />
                    : null}
            </Fragment>
    );
}

export default TreatmentDiseaseCourses