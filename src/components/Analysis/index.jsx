import React from "react";
import { Fragment } from "react";
import { PieChart } from 'react-minimal-pie-chart';

const Analysis = () => {
    return (
        <Fragment>
            <PieChart animate={true} label={(labelRenderProps) => Math.round(labelRenderProps.dataEntry.percentage) + "%"}
                data={[
                    { title: 'One', value: 10, color: '#E38627' },
                    { title: 'Two', value: 15, color: '#C13C37' },
                    { title: 'Three', value: 20, color: '#6A2135' },
                ]}
            />;
        </Fragment>
    );
}

export default Analysis