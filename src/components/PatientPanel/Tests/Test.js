import { Fragment, useState } from "react"
import showResult from "./ShowResult"

const Test = (test) => {
    return (
        <Fragment>
            <div>
                <button onClick={() => test.onClick(test.data)}>
                    {test.data.orderNumber} {test.data.testType} {test.data.testDate} {test.data.resultDate}
                    {showResult(test.data.result)}
                </button>
            </div>
        </Fragment>
    );
}

export default Test