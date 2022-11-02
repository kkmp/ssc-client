import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import request from "../../Request";
import Errors from "../../Errors";
import dateService from "../../DateService";
import Select from "react-select";
import getDataSelect from "../../../data-control/getDataSelect";
import RequiredComponent from "../../RequiredComponent";
import LoadingComponent from "../../LoadingComponent";

const EditTreatment = (treatment) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isCovid, setIsCovid] = useState("");
    const [treatmentStatus, setTreatmentStatus] = useState("");
    const [treatmentStatusOptions, setTreatmentStatusOptions] = useState("");
    const [error, setError] = useState(null);

    const isCovidOptions = [
        { value: '', label: "-" },
        { value: true, label: "Stwierdzono COVID" },
        { value: false, label: "Nie stwierdzono COVID" },
    ]
    useEffect(() => {
        const handleChange = () => {
            setStartDate(dateService(treatment.data.startDate))
            setEndDate(dateService(treatment.data.endDate))
            setTreatmentStatus({ value: treatment.data.treatmentStatusId, label: treatment.data.treatmentStatus })
            if (treatment.data.isCovid !== null) {
                var resultSearch = isCovidOptions.filter(item => item.value === treatment.data.isCovid)
                setIsCovid(resultSearch[0])
            }
            else {
                setIsCovid(isCovidOptions[0])
            }

            const urlTreatmentStatus = '/api/Data/getTreatmentStatuses'
            getDataSelect(urlTreatmentStatus).then((result) => {
                setTreatmentStatusOptions(result)
            })
        }
        handleChange()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = '/api/Treatment/editTreatment'
        var data = {
            "id": treatment.id,
            "startDate": startDate,
            "treatmentStatusId": treatmentStatus.value
        }

        if (endDate) {
            data.endDate = endDate
        }

        if (isCovid.value) {
            data.isCovid = isCovid.value
        }

        const callback = () => {
            treatment.onSubmit()
            toast.success("Zapisano zmiany!", { position: toast.POSITION.BOTTOM_RIGHT });
            setError(null)
        }
        const errorCallback = (response) => {
            setError(response.data)
        }
        await request({ url: url, data: data, type: "PUT" }, callback, errorCallback);
    };

    return (
        <Fragment>
            {error != null ? <Errors data={error} /> : null}
            <form onSubmit={handleSubmit}>
                <div className="pb-3 pt-3">
                    <h2>Edytuj leczenie</h2>
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="startDate">Data i godzina rozpoczęcia leczenia</label>
                    <RequiredComponent />
                    <input type="datetime-local" id="startDate" name="startDate" value={startDate} onChange={({ target }) => setStartDate(target.value)} required className="form-control" />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="endDate">Data i godzina zakończenia leczenia</label>
                    <input type="datetime-local" id="endDate" name="endDate" value={endDate} onChange={({ target }) => setEndDate(target.value)} className="form-control" />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="isCovid">Stwierdzenie zachorowania na COVID</label>
                    <RequiredComponent />
                    <Select id="isCovid" name="isCovid" required
                        value={isCovid}
                        onChange={setIsCovid}
                        options={isCovidOptions} />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="treatmentStatus">Status leczenia</label>
                    <RequiredComponent />
                    {treatmentStatusOptions ? <div className="form-outline">
                        <Select id="treatmentStatus" name="treatmentStatus" required placeholder="Wybierz status leczenia"
                            value={treatmentStatus}
                            onChange={setTreatmentStatus}
                            options={treatmentStatusOptions} />
                    </div> : <LoadingComponent />}
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block">Zapisz zmiany</button>
                </div>
            </form>
        </Fragment>
    );
}

export default EditTreatment