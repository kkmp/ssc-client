import React, { Fragment, useState } from "react";
import request from "../Request";
import Patient from "../Patient/Patient";
import Errors from "../Errors";
import InfiniteScroll from "react-infinite-scroller";
import {
  Container,
  Box,
  Typography,
  FormLabel,
  TextField,
  FormControl,
  Checkbox,
  InputAdornment,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import { PersonSearch, Search } from "@mui/icons-material";
import { Form } from "react-bootstrap";

const SearchPatient = () => {
  const [option, setOption] = useState("surname");
  const [orderType, setOrderType] = useState("ascending");
  const [maleChecked, setMaleChecked] = useState(false);
  const [femaleChecked, setFemaleChecked] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [pageNr, setPageNr] = useState(1);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [hasMoreItems, setHasMoreItems] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData([]);
    setPageNr(1);
    setHasMoreItems(true);
  };

  const handleSearch = async () => {
    let sex = "";
    if (maleChecked && femaleChecked) {
      sex = "both";
    } else if (maleChecked) {
      sex = "male";
    } else if (femaleChecked) {
      sex = "female";
    } else {
      setError({ errors: { message: ["Nie wybrano żadnej płci"] } });
      setHasMoreItems(false);
      return;
    }

    if (fetching) {
      return;
    }

    setFetching(true);
    const url =
      "/api/Patient/filterPatients/" +
      pageNr +
      "/" +
      option +
      "/" +
      orderType +
      "/" +
      sex +
      "/" +
      searchName;
    const callback = (response) => {
      var newDataArr = Object.keys(response.data).map(
        (key) => response.data[key]
      );
      setError(null);
      if (newDataArr.length > 0) {
        setData([...data, ...newDataArr]);
        setHasMoreItems(true);
      } else {
        setHasMoreItems(false);
      }
      setPageNr(pageNr + 1);
      setFetching(false);
    };
    const errorCallback = (response) => {
      setError(response.data);
      setFetching(false);
      setHasMoreItems(false);
    };
    await request({ url: url, type: "GET" }, callback, errorCallback);
  };

  const handleChangeOption = (event) => {
    setOption(event.target.value);
  };

  const handleChangeOrderType = (event) => {
    setOrderType(event.target.value);
  };

  const loader = <div key={0} className="spinner-border" role="status"></div>;

  return (
    <Container>
      <Box bgcolor={"azure"} flex={5}>
        <Fragment>
          <Box p={3}>
            <Typography variant="h6" marginBottom={"20px"}>
              <PersonSearch /> Wyszukaj pacjenta
            </Typography>
          </Box>
          <Box p={3}>
            <Form onSubmit={handleSubmit}>
              {error != null ? <Errors data={error} /> : null}

              <FormControl variant="standard">
                <TextField
                  id="search"
                  size="normal"
                  name="search"
                  variant="standard"
                  placeholder="Wyszukaj pacjenta..."
                  value={searchName}
                  onChange={({ target }) => setSearchName(target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />

                <Box
                  sx={{ border: "dashed 1px grey" }}
                  padding={"10px"}
                  marginBottom={"20px"}
                  marginTop={"20px"}
                >
                  <Typography align="center" variant="h5">
                    Filtry{" "}
                  </Typography>

                  <FormLabel id="demo-radio-buttons-group-label">
                    Atrybuty sortowania
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="surname"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="surname"
                      control={
                        <Radio
                          name="option"
                          id="surname"
                          checked={option === "surname"}
                          onChange={handleChangeOption}
                        />
                      }
                      label="Nazwisko"
                    />
                    <FormControlLabel
                      value="birthdate"
                      control={
                        <Radio
                          name="option"
                          id="birthdate"
                          checked={option === "birthdate"}
                          onChange={handleChangeOption}
                        />
                      }
                      label="Data urodzenia"
                    />
                  </RadioGroup>

                  <FormLabel id="demo-radio-buttons-group-label">
                    Kolejność sortowania
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="ascending"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="ascending"
                      control={
                        <Radio
                          name="orderType"
                          value="ascending"
                          id="ascending"
                          checked={orderType === "ascending"}
                          onChange={handleChangeOrderType}
                        />
                      }
                      label="Rosnąco"
                    />
                    <FormControlLabel
                      value="descending"
                      control={
                        <Radio
                          name="orderType"
                          value="descending"
                          id="descending"
                          checked={orderType === "descending"}
                          onChange={handleChangeOrderType}
                        />
                      }
                      label="Malejąco"
                    />
                  </RadioGroup>

                  <FormLabel id="demo-radio-buttons-group-label">
                    Płeć
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={
                        <Checkbox
                          name="sex"
                          value="female"
                          id="female"
                          checked={femaleChecked}
                          onChange={(x) => setFemaleChecked(!femaleChecked)}
                        />
                      }
                      label="Kobieta"
                    />
                    <FormControlLabel
                      value="male"
                      control={
                        <Checkbox
                          name="sex"
                          value="male"
                          id="male"
                          checked={maleChecked}
                          onChange={(x) => setMaleChecked(!maleChecked)}
                        />
                      }
                      label="Mężczyzna"
                    />
                  </RadioGroup>
                </Box>

                <Button type="submit" variant="outlined" size="normal">
                  Szukaj
                </Button>
              </FormControl>
            </Form>
          </Box>

          <Box p={3} align="center">
            <InfiniteScroll
              loadMore={handleSearch}
              hasMore={hasMoreItems}
              offset={5}
              loader={loader}
            >
              {data.length !== 0 ? (
                <Fragment>
                  <Typography variant="h6" textTransform={"full-width"} mb={4}>
                    Wyniki wyszukiwania
                  </Typography>

                  {data.map((patient) => (
                    <Box p={5} key={patient.id}>
                      <Patient key={patient.id} data={patient} />
                    </Box>
                  ))}
                </Fragment>
              ) : (
                <Fragment>
                  <Typography variant="h4">Brak wyników</Typography>
                </Fragment>
              )}
            </InfiniteScroll>
          </Box>
        </Fragment>
      </Box>
    </Container>
  );
};

export default SearchPatient;
