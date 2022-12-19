import { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Errors from "../../Errors";
import RequiredComponent from "../../RequiredComponent";
import getDataSelect from "../../../data-control/getDataSelect";
import request from "../../Request";
import Select from "react-select";
import LoadingComponent from "../../LoadingComponent";

const AddPlace = (props) => {
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [cityOptions, setCityOptions] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleChange = () => {
      const urlCity = "/api/Data/getCities";
      getDataSelect(urlCity).then((result) => {
        setCityOptions(result);
      });
    };
    handleChange();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "/api/Test/addPlace";
    var data = {
      name: name,
      street: street,
      cityId: city.value,
    };

    if (!city) {
      setError({
        errors: { message: ["Aby zapisać, należy wybrać miejscowość"] },
      });
      return;
    }

    const callback = () => {
      props.onSubmit();
      toast.success("Zapisano zmiany!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setError(null);
    };

    const errorCallback = (response) => {
      setError(response.data);
    };
    await request(
      { url: url, data: data, type: "POST" },
      callback,
      errorCallback
    );
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div className="pb-3 pt-3">
          <h2>Nowa placówka wykonująca testy</h2>
        </div>
        {error != null ? <Errors data={error} /> : null}

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="name">
            Nazwa placówki
          </label>
          <RequiredComponent />
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
            required
            className="form-control"
            maxLength={50}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="endDate">
            Adres
          </label>
          <RequiredComponent />
          <input
            type="text"
            id="street"
            name="street"
            value={street}
            onChange={({ target }) => setStreet(target.value)}
            required
            className="form-control"
            maxLength={100}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="city">
            Miasto
          </label>
          <RequiredComponent />
          {cityOptions ? (
            <div className="form-outline mb-4">
              <Select
                id="treatmentStatus"
                name="city"
                required
                placeholder="Wybierz miejscowość"
                value={city}
                onChange={setCity}
                options={cityOptions}
              />
            </div>
          ) : (
            <LoadingComponent />
          )}
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-block">
            Dodaj placówkę
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default AddPlace;
