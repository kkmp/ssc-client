import React, { Fragment, useState } from "react";
import request from "../Request";
import Patient from "../Patient/Patient";
import Errors from "../Errors";
import Paginate from "../Paginate";
import InfiniteScroll from "react-infinite-scroller";
import { Container, Box, Typography, FormLabel, TextField, FormControl,
        Checkbox, Paper, InputAdornment, Radio, RadioGroup, FormControlLabel, Button,
    TableContainer, TableHead, Table, TableBody, TableRow, TableCell} from "@mui/material";
import { PersonSearch, Search } from "@mui/icons-material";
import { Form } from "react-bootstrap";

const SearchPatient = () => {
    const [option, setOption] = useState("surname");
    const [orderType, setOrderType] = useState("ascending");
    const [checked, setChecked] = useState({ genders: [] });
    const [searchName, setSearchName] = useState("");
    const [pageNr, setPageNr] = useState(1);
    const [data, setData] = useState([])
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [hasMoreItems, setHasMoreItems] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setData([])
        setPageNr(1)
        setHasMoreItems(true)
    };

    const handleSearch = async () => {
        let sex = "";
        switch (checked.genders.length) {
            case 0:
                setError({ errors: { message: ["Nie wybrano żadnej płci"] } })
                return
            case 1:
                sex = checked.genders[0]
                break
            case 2:
                sex = "both"
                break
            default:
                return
        }

        if(fetching)
        {
            return
        }
        
        setFetching(true)
        const url = '/api/Patient/filterPatients/' + pageNr + '/' + option + '/' + orderType + '/' + sex + '/' + searchName
        const callback = (response) => {
            var newDataArr = Object.keys(response.data).map((key) => response.data[key]);
            setError(null)
            if(newDataArr.length > 0)
            {
                setData([...data, ...newDataArr])
                setHasMoreItems(true);
            }
            else
            {
                setHasMoreItems(false);
            }
            setPageNr(pageNr + 1)
            setFetching(false)
        }
        const errorCallback = (response) => {
            setError(response.data)
            setFetching(false)
            setHasMoreItems(false)
        }
        await request({ url: url, type: "GET" }, callback, errorCallback);
        
    }

    const handleChangeOption = (event) => {
        setOption(event.target.value)
    }

    const handleChangeOrderType = (event) => {
        setOrderType(event.target.value)
    }

    const handleChangeSex = (e) => {
        const isChecked = e.target.checked
        if (isChecked) {
            setChecked({ genders: [...checked.genders, e.target.value] })
        } else {
            const index = checked.genders.indexOf(e.target.value)
            checked.genders.splice(index, 1)
            setChecked({ genders: checked.genders })
        }
    };

    const loader = (
        <div className="spinner-border" role="status"></div>
      );

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

                  {/*<input type="text" name="search" id="search" value={searchName} onChange={({ target }) => setSearchName(target.value)} />*/}
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

                    {/*
                Sortowanie
            <div>
                <input value="surname" type="radio" name="option" id="surname" checked={option === 'surname'} onChange={handleChangeOption} />Nazwisko
                <input value="birthdate" type="radio" name="option" id="birthdate" checked={option === 'birthdate'} onChange={handleChangeOption} />Data urodzenia
            </div>
            */}

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

                    {/* 
            <div>
                <input value="ascending" type="radio" name="orderType" id="ascending" checked={orderType === 'ascending'} onChange={handleChangeOrderType} />Rosnąco
                <input value="descending" type="radio" name="orderType" id="descending" checked={orderType === 'descending'} onChange={handleChangeOrderType} />Malejąco
            </div>
            */}

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
                            onChange={handleChangeSex}
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
                            onChange={handleChangeSex}
                          />
                        }
                        label="Mężczyzna"
                      />
                    </RadioGroup>
                  </Box>

                  {/* <div>
                <input type="checkbox" name="sex" value="female" id="female" onChange={handleChangeSex} />Kobieta
            </div>
            <div>
                <input type="checkbox" name="sex" value="male" id="male" onChange={handleChangeSex} />Mężczyzna
            </div>
            */}

                  <Button type="submit" variant="outlined" size="normal">
                    Szukaj
                  </Button>
                  {/*<button type="submit">Szukaj</button>*/}
                </FormControl>
              </Form>
            </Box>

            <Box p={3} align="center">
              
              {/*data.map((patient) => <Patient key={patient["id"]} data={patient} />)*/}

              <InfiniteScroll
                loadMore={handleSearch}
                hasMore={hasMoreItems}
                offset={5}
                loader={loader}
                endMessage='Nie ma więcej pacjentów'
                dataLength={data.length}
                
              >
                
                
                {console.log(data)}
                {data.length !== 0 ?
                
                <Fragment>
                <Typography variant="h6" textTransform={"full-width"} mb={4}>
                    Wyniki wyszukiwania
                </Typography>
                <TableContainer
                sx={{
                  padding: "10px 10px 10px 10px",
                  borderRadius: "16px",
                  boxShadow: "1px 0px 21px 4px rgba(66, 68, 90, 1)",
                }}
                component={Paper}
              >
                <Table aria-label="simple table">
                    <TableHead sx={{ th: { fontWeight: "bold" } }}>
                      <TableCell>PŁEĆ</TableCell>
                      <TableCell>IMIĘ</TableCell>
                      <TableCell>NAZWISKO</TableCell>
                      <TableCell>PESEL</TableCell>
                      <TableCell>DATA URODZENIA</TableCell>
                      <TableCell>AKCJA</TableCell>
                    </TableHead>
                    
                    
                    <TableBody>

                    {data.map((patient) => (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <Patient key={patient.id} data={patient} />
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                </Fragment>:null
            
            }
              </InfiniteScroll>
            </Box>
          </Fragment>
        </Box>
      </Container>
    );
}

export default SearchPatient