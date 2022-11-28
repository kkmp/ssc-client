import { Fragment } from "react"
import Error from "./Error";
import './Error.css'

const Errors = (props) => {
    var newErrorArr = Object.keys(props.data.errors).map((key) => props.data.errors[key].join(" "));

    return (
        <Fragment>
            {newErrorArr.map((err, idx) => <Error message={err} key={idx} />)}
        </Fragment>
    )
}

export default Errors