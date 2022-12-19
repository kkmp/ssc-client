import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import request from "../../Request";
import Errors from "../../Errors";
import dateService from "../../DateService";
import Select from "react-select";
import getDataSelect from "../../../data-control/getDataSelect";
import RequiredComponent from "../../RequiredComponent";
import LoadingComponent from "../../LoadingComponent";

const EditTreatmentDiseaseCourse = (treatmentDiseaseCourse) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [diseaseCourse, setDiseaseCourse] = useState("");
  const [diseaseCourseOptions, setDiseaseCourseOptions] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleChange = () => {
      setDate(dateService(treatmentDiseaseCourse.data.date));
      setDescription(treatmentDiseaseCourse.data.description);
      setDiseaseCourse({
        value: treatmentDiseaseCourse.data.diseaseCourseId,
        label: treatmentDiseaseCourse.data.diseaseCourse,
      });

      const urlDiseaseCourse = "/api/Data/getDiseaseCourses";
      getDataSelect(urlDiseaseCourse).then((result) => {
        setDiseaseCourseOptions(result);
      });
    };
    handleChange();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "/api/TreatmentDiseaseCourse/editTreatmentDiseaseCourse";
    const data = {
      id: treatmentDiseaseCourse.id,
      date: date,
      description: description,
      diseaseCourseId: diseaseCourse.value,
    };
    const callback = () => {
      treatmentDiseaseCourse.onSubmit();
      toast.success("Zapisano zmiany!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setError(null);
    };
    const errorCallback = (response) => {
      setError(response.data);
    };
    await request(
      { url: url, data: data, type: "PUT" },
      callback,
      errorCallback
    );
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div className="pb-3 pt-3">
          <h2>Edytuj powikłanie</h2>
        </div>
        {error != null ? <Errors data={error} /> : null}

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="date">
            Data i godzina
          </label>
          <RequiredComponent />
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="description">
            Opis
          </label>
          <RequiredComponent />
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            required
            className="form-control"
            rows="3"
            placeholder="Dodaj opis powikłania"
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="diseaseCourse">
            Rodzaj powikłania
          </label>
          <RequiredComponent />
          {diseaseCourseOptions ? (
            <Select
              id="diseaseCourse"
              name="diseaseCourse"
              required
              placeholder="Wybierz rodzaj powikłania"
              value={diseaseCourse}
              onChange={setDiseaseCourse}
              options={diseaseCourseOptions}
            />
          ) : (
            <LoadingComponent />
          )}
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-block">
            Zapisz zmiany
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default EditTreatmentDiseaseCourse;
