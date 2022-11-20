import React, { Fragment, useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const Paginate = (props) => {
    const elementsPerPage = 3
    const [data, setData] = useState([])
    const [dataToShow, setDataToShow] = useState([])
    const [pageNumber, setPageNumber] = useState(-1)
    const [prevDisabled, setPrevDisabled] = useState(true)
    const [nextDisabled, setNextDisabled] = useState(true)

    useEffect(() => {
        setData(props.data)
        setPageNumber(props.pageNumber)
    }, []);

    useEffect(() => {
        setDataToShow(data.slice(pageNumber * elementsPerPage, (pageNumber + 1) * elementsPerPage))

        if (pageNumber === 0) {
            setPrevDisabled(true)
        }
        else {
            setPrevDisabled(false)
        }

        let lastPage =  Math.ceil(1.0 * data.length / elementsPerPage) - 1
        if (pageNumber === lastPage) {
            setNextDisabled(true)
        }
        else {
            setNextDisabled(false)
        }
        
        if(data.length == 0)
        {
            setPrevDisabled(true)
            setNextDisabled(true)
        }

        props.pageNumberChanged(pageNumber)
    }, [pageNumber])

    const prevPage = () => {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1)
        }

    }

    const nextPage = () => {
        let lastPage =  Math.ceil(1.0 * data.length / elementsPerPage) - 1
        if(pageNumber < lastPage)
        {
            setPageNumber(pageNumber + 1)
        }
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));


    return (
            <Fragment>
                       
                        {/* wiersze dla elementów testy/ historia chorby/ leczenie/ powiklania */}
                        {dataToShow.map((element) => <Fragment key={element.key}>{element}</Fragment>)}
                        
                 
                <button key="prev" disabled={prevDisabled} onClick={prevPage}>&larr;</button>
                <button key="next" disabled={nextDisabled} onClick={nextPage} >&rarr;</button>
            </Fragment >
    );
}

export default Paginate