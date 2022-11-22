import { Fragment } from "react"

const LoadingComponent = () => {
    return (
        <Fragment>
            <div className="mt-4">
                <div className="spinner-border" role="status"></div>
            </div>
        </Fragment>
    );
}

export default LoadingComponent