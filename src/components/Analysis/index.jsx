import React from "react";
import { Fragment, useEffect, useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import { AgChartsReact } from "ag-charts-react";
import request from "../Request";
import Select from "react-select";
import LoadingComponent from "../LoadingComponent";
import getDataSelect from "../../data-control/getDataSelect";
import Errors from "../Errors";
import showResult from "../PatientPanel/Tests/ShowResult";
import axios from "axios";
import getToken from "../GetToken";
import { Analytics } from "@mui/icons-material";

const Analysis = () => {
  const [data, setData] = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [province, setProvince] = useState("");
  const [provincesOptions, setProvincesOptions] = useState("");
  const [type, setType] = useState("tests");
  const [category, setCategory] = useState("type");
  const [saveUrl, setSaveUrl] = useState("");
  const [error, setError] = useState(null);

  const resultOptions = [
    { value: "csv", label: "CSV" },
    { value: "xlsx", label: "XLSX" },
  ];

  const [filetype, setFiletype] = useState(resultOptions[0]);

  useEffect(() => {
    const handleChange = () => {
      const urlCity = "/api/Data/getProvinces";
      getDataSelect(urlCity).then((result) => {
        setProvincesOptions(result);
      });
    };
    handleChange();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = "/api/Report/" + type + "/";
    if (type === "tests") {
      url += category + "/";
    }
    url += province.value + "/" + dateFrom + "/" + dateTo;

    if (!province.value) {
      setError({
        errors: {
          message: ["Aby wyświetlić raport, należy wybrać województwo"],
        },
      });
      return;
    }

    const callback = (response) => {
      var newDataArr = response.data;
      var arr = newDataArr.map((x) => ({
        key: x.key,
        proc: Math.round((x.proc + Number.EPSILON) * 100) / 100,
      }));
      if (type === "tests" && category === "result") {
        arr = arr.map((x) => ({ key: showResult(x.key), proc: x.proc }));
      }

      setData({
        data: arr,
        series: [
          {
            type: "pie",
            angleKey: "proc",
            calloutLabelKey: "key",
            innerRadiusOffset: -80,
            sectorLabelKey: "proc",
            sectorLabel: {
              color: "white",
              fontWeight: "bold",
              formatter: function (params) {
                return params.sectorLabelValue + "%";
              },
            },
          },
        ],
      });
      setSaveUrl(url);
      setError(null);
    };
    const errorCallback = (response) => {
      setError(response.data);
    };
    await request({ url: url, type: "GET" }, callback, errorCallback);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const convertDate = (date) => {
    let newDate = new Date(date);
    return `${newDate.getDate()}.${
      newDate.getMonth() + 1
    }.${newDate.getFullYear()}`;
  };

  const handleSave = async () => {
    let url = "https://localhost:7090" + saveUrl + "/" + filetype.value;

    axios
      .get(url, {
        responseType: "arraybuffer",
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      })
      .then((response) => {
        var fileName = "result." + filetype.value;
        let blob = new Blob([response.data], {
          type: "application/" + filetype.value,
        });
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  return (
    <Fragment>
      <Container>
        <Box flex={5}>
          <Box p={3}>
            <Typography variant="h6" mb={4}>
              <Analytics /> Analiza
            </Typography>
          </Box>

          <Box p={3}>
            <div className="row">
              {error != null ? <Errors data={error} /> : null}
              <div className="pb-3 pt-3">
                <h2>Opcje raportu</h2>
              </div>
              <div className="col-6">
                <div>
                  <label className="form-label" htmlFor="btn-group">
                    Rodzaj
                  </label>
                </div>
                <div className="btn-group">
                  <input
                    type="radio"
                    className="btn-check"
                    name="type"
                    id="tests"
                    value="tests"
                    autoComplete="off"
                    defaultChecked={type === "tests"}
                    onChange={handleChangeType}
                  />
                  <label className="btn btn-outline-primary" htmlFor="tests">
                    Testy
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    name="type"
                    id="diseaseCourses"
                    value="diseaseCourses"
                    autoComplete="off"
                    defaultChecked={type === "diseaseCourses"}
                    onChange={handleChangeType}
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="diseaseCourses"
                  >
                    Powikłania
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    name="type"
                    id="treatments"
                    value="treatments"
                    autoComplete="off"
                    defaultChecked={type === "treatments"}
                    onChange={handleChangeType}
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="treatments"
                  >
                    Leczenie
                  </label>
                </div>

                {type === "tests" ? (
                  <Fragment>
                    <div className="pt-3">
                      <label className="form-label" htmlFor="btn-group">
                        Kategoria
                      </label>
                    </div>
                    <div>
                      <div className="btn-group">
                        <input
                          type="radio"
                          className="btn-check"
                          name="category"
                          id="type"
                          value="type"
                          autoComplete="off"
                          defaultChecked={category === "type"}
                          onChange={handleChangeCategory}
                        />
                        <label
                          className="btn btn-outline-primary"
                          htmlFor="type"
                        >
                          Typ
                        </label>

                        <input
                          type="radio"
                          className="btn-check"
                          name="category"
                          id="result"
                          value="result"
                          autoComplete="off"
                          defaultChecked={category === "result"}
                          onChange={handleChangeCategory}
                        />
                        <label
                          className="btn btn-outline-primary"
                          htmlFor="result"
                        >
                          Wynik
                        </label>
                      </div>
                    </div>
                  </Fragment>
                ) : null}
              </div>

              <form className="col-6" onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="dateFrom">
                    Data od
                  </label>
                  <input
                    type="date"
                    id="dateFrom"
                    name="dateFrom"
                    value={dateFrom}
                    onChange={({ target }) => setDateFrom(target.value)}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="dateTo">
                    Data do
                  </label>
                  <input
                    type="date"
                    id="dateTo"
                    name="dateTo"
                    value={dateTo}
                    onChange={({ target }) => setDateTo(target.value)}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="province">
                    Województwo
                  </label>
                  {provincesOptions ? (
                    <div className="form-outline">
                      <Select
                        id="province"
                        name="province"
                        placeholder="Wybierz województwo"
                        value={province}
                        onChange={setProvince}
                        options={provincesOptions}
                      />
                    </div>
                  ) : (
                    <LoadingComponent />
                  )}
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-block">
                    Wyświetl raport
                  </button>
                </div>
              </form>
            </div>
          </Box>
          <Box m={2}>
            <div className="container">
              {data ? (
                <Fragment>
                  <div className="pb-3 pt-3">
                    <h2>Wyniki</h2>
                  </div>
                  <div>
                    {province.label}, {convertDate(dateFrom)} —{" "}
                    {convertDate(dateTo)}
                  </div>

                  <AgChartsReact name="chart" options={data} />

                  <div className="input-group d-flex justify-content-end">
                    <button
                      type="button"
                      onClick={handleSave}
                      className="btn btn-primary btn-block"
                    >
                      Zapisz do pliku
                    </button>

                    <Select
                      id="filetype"
                      name="filetype"
                      placeholder="Wybierz typ pliku"
                      value={filetype}
                      onChange={setFiletype}
                      options={resultOptions}
                    />
                  </div>
                </Fragment>
              ) : null}
            </div>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
};

export default Analysis;
