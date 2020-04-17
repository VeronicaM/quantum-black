import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';

import MultiColorBarChart from './MultiColorBarChart';

import './BarChart.scss';

const chartConfig = {
    width: "100%",
    height: "100%",
    valueLabelClass: "bar__value-label",
    nameLabelClass: "bar__name-label"
};

function BarChart({ values }) {
    const chartId = "js-barchart";

    useEffect(() => {
        /* 
         * this acts as both componentDidMount and componentDidUpdate 
         * as the chart needs to be repainted everytime a new value is added
         */
        const chart = new MultiColorBarChart(chartId, values, chartConfig);

        return function cleanup() {
            chart.cleanup();
        };
    });

    return <div id={chartId} className="barchart__container"></div>
};

BarChart.propTypes = {
    values: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number
    })).isRequired
};

export default memo(BarChart);