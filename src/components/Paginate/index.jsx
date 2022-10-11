import React, { Fragment, useState, useEffect } from "react";

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

    return (
            <Fragment>
                <table className="table table-striped">
                    <tbody>
                        {dataToShow.map((element) => <tr key={element.key}><td>{element}</td></tr>)}
                    </tbody>
                </table>
                <button key="prev" disabled={prevDisabled} onClick={prevPage}>&larr;</button>
                <button key="next" disabled={nextDisabled} onClick={nextPage} >&rarr;</button>
            </Fragment >
    );
}

export default Paginate