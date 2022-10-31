import React from "react";
import { Fragment, useEffect, useState } from "react";
import { PieChart } from 'react-minimal-pie-chart';
import request from "../Request";
import randomColor from "randomcolor";

const Analysis = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const handleChange = async () => {
            const url = '/api/Report/treatments/b9c8d025-5afd-44db-9710-c309930e4774/2020-01-01/2022-12-23'
            const callback = (response) => {
                var newDataArr = response.data;
                setData(newDataArr.map(x => ({ title: x.key, value: x.proc, color: randomColor() })))
                setError(null)
            }
            const errorCallback = (response) => {
                setError(response.data)
            }
            await request({ url: url, type: "GET" }, callback, errorCallback);
        }
        handleChange()
    }, []);


    return (
        <Fragment>
            {data.map(x =>
                <div key={x.title}>
                    <div>
                        <div style={{ background: x.color, width: "20px", height: "20px" }}></div>
                        {x.title} {x.value}%
                    </div>

                </div>
            )}
            <PieChart animate={true} label={(labelRenderProps) => Math.round(labelRenderProps.dataEntry.percentage) + "%"}
                data={data}
            />;
        </Fragment>
    );
}

export default Analysis