import React, { Fragment, useState } from "react";
import request from "../Request";
import Errors from "../Errors";
import RequiredComponent from "../RequiredComponent";
import { toast } from "react-toastify";

const ChangePasswordOnDemand = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "/api/ChangePassword/changePassword";
    const newData = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    const callback = (response) => {
      toast.success("Zmieniono hasło", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

      setError(null);
    };
    const errorCallback = (response) => {
      setError(response.data);
    };
    await request(
      { url: url, data: newData, type: "PUT" },
      callback,
      errorCallback
    );
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div className="pb-3 pt-3">
          <h2>Zmień hasło</h2>
        </div>
        {error != null ? <Errors data={error} /> : null}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="startDate">
            Stare hasło
          </label>
          <RequiredComponent />
          <input
            type="password"
            name="oldPassword"
            value={oldPassword}
            onChange={({ target }) => setOldPassword(target.value)}
            required
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="endDate">
            Nowe hasło
          </label>
          <RequiredComponent />
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={({ target }) => setNewPassword(target.value)}
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-block">
            Zmień hasło
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default ChangePasswordOnDemand;
