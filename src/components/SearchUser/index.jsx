import React, { Fragment, useState } from "react";
import request from "../Request";
import User from "../User/User";
import Errors from "../Errors";
import {
  Container,
  Box,
  Typography,
  FormLabel,
  TextField,
  FormControl,
  InputAdornment,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { Form } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroller";

const SearchUser = () => {
  const [option, setOption] = useState("surname");
  const [orderType, setOrderType] = useState("ascending");
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
    if (fetching) {
      return;
    }

    setFetching(true);
    const url =
      "/api/User/filterUsers/" +
      pageNr +
      "/" +
      option +
      "/" +
      orderType +
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

  const loader = <div className="spinner-border" role="status"></div>;

  return (
    <Container>
      <Box bgcolor={"azure"} flex={5}>
        <Box p={3}>
          <Typography variant="h6" marginBottom={"20px"}>
            <Search /> Wyszukaj użytkownika
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
                placeholder="Wyszukaj użytkownika..."
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
                    value="email"
                    control={
                      <Radio
                        name="option"
                        id="email"
                        checked={option === "email"}
                        onChange={handleChangeOption}
                      />
                    }
                    label="Email"
                  />
                  <FormControlLabel
                    value="active"
                    control={
                      <Radio
                        name="option"
                        id="active"
                        checked={option === "active"}
                        onChange={handleChangeOption}
                      />
                    }
                    label="Aktywność"
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
            endMessage="Nie ma więcej użytkowników"
            dataLength={data.length}
          >
            {console.log(data)}
            {data.length !== 0 ? (
              <Fragment>
                <Typography variant="h6" textTransform={"full-size"} mb={5}>
                  Wyniki wyszukiwania
                </Typography>

                {data.map((user) => (
                  <Box mb={5}>
                    <User key={user.id} data={user} showButton={true} />
                  </Box>
                ))}
              </Fragment>
            ) : (
              <Typography variant="h4">Brak wyników</Typography>
            )}
          </InfiniteScroll>
        </Box>
      </Box>
    </Container>
  );
};

export default SearchUser;
