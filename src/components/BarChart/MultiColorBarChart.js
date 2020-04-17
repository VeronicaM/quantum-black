
import * as d3 from "d3";

let defaultConfig = {
    width: 500,
    height: 500,
    barHeight: 30,
    barGap: 45,
    valueLabelOffsetY: 18,
    nameLabelOffsetY: 20,
    margin: {
        left: -35,
        top: 0
    },
    colors: [
        '#AC3839',
        '#ff7f00',
        '#ACAC38',
        '#38AC39',
        '#38ACAC',
        '#3939AC',
        '#AC38AC'
    ]
};

export default class ColoredBarChart {
    constructor(chartId, values, config = defaultConfig) {
        this.config = { ...defaultConfig, ...config };
        this.chartId = chartId;
        this.values = values;

        // store max value to enable responsive bar widths calculations
        this.max = this.getMaxValue();

        this.createChart();
    }

    renderChart() {
        this.drawBars()
        this.addLabels();
    }

    removePreviousChart() {
        const chart = document.getElementById(this.chartId);
        if (chart) {
            chart.innerHTML = '';
        }
    }

    createChart() {
        const {
            width,
            height,
            margin
        } = this.config;

        this.svg = d3
            .select(`#${this.chartId}`)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        this.renderChart();
    }

    getMaxValue() {
        return this.values.reduce((result, { name, value }) => {
            if (value > result) {
                result = value;
            }
            return result;
        }, 0);
    }

    getResponsiveBarWidth(value, offset = 0) {
        return ((80 * (value + offset)) / this.max);
    }

    drawBars() {
        const {
            barGap,
            barHeight,
            colors
        } = this.config;

        if (!this.svg) {
            throw new Error('Please create chart first');
        }

        this.svg
            .selectAll("rect")
            .data(this.values)
            .enter()
            .append("rect")
            .attr("x", barGap)
            .attr("y", (d, i) => i * barGap)
            .attr("width", (d) => `${this.getResponsiveBarWidth(d.value)}%`)
            .attr("height", barHeight)
            .attr("fill", () => {
                const index = Math.round(Math.random() * (colors.length - 1));
                return colors[index];
            });
    };

    addLabels() {
        const {
            barGap,
            valueLabelOffsetY,
            nameLabelOffsetY,
            valueLabelClass,
            nameLabelClass
        } = this.config;


        if (!this.svg) {
            throw new Error('Please create chart first');
        }

        // value labels
        this.svg.selectAll("text")
            .data(this.values)
            .enter()
            .append("text")
            .text((d) => d.value)
            .attr("x", (d, i) => {
                const offset = String(d.value).length + 10;
                return `${this.getResponsiveBarWidth(d.value, offset)}%`
            })
            .attr("y", (d, i) => i * barGap + valueLabelOffsetY)
            .attr("class", valueLabelClass)

        // name labels
        this.svg.selectAll("text.label")
            .data(this.values)
            .enter()
            .append("text")
            .text((d) => d.name)
            .attr("x", (d, i) => {
                const offset = -d.name.length - 1;
                return `${this.getResponsiveBarWidth(d.value, offset)}%`
            })
            .attr("y", (d, i) => i * barGap + nameLabelOffsetY)
            .attr("class", nameLabelClass)
    }

    cleanup() {
        this.removePreviousChart();
    }
}