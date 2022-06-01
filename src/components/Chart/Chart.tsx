import React, { createRef, useEffect, useRef, useState } from "react";
import "./chart.scss";
import * as d3 from "d3";
import data from "./../../assets/data/data.json";
import { addData, IData } from "../../state/features/dataSlice";
import transformData from "./utils/transformData";
import bitcoinData from "./utils/formatBitcoinData";
import getMinMax from "./utils/getMinMax";
import getAverage from "./utils/average";
import { data$, simulateAPI, progressiveData } from "./utils/simulateAPI";
import useAppDispatch from "../../hooks/useAppDispatch";
import { dispatch } from "d3";

/**
 * Makes the chart responsive
 * @param svg
 */
function responsivefy(svg: any) {
  // get container + svg aspect ratio
  var container = d3.select(svg.node().parentNode),
    width = parseInt(svg.style("width")),
    height = parseInt(svg.style("height")),
    aspect = width / height;

  // add viewBox and preserveAspectRatio properties,
  // and call resize so that svg resizes on inital page load
  svg
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("perserveAspectRatio", "xMinYMid")
    .call(resize);

  // to register multiple listeners for same event type,
  // you need to add namespace, i.e., 'click.foo'
  // necessary if you call invoke this function for multiple svgs
  // api docs: https://github.com/mbostock/d3/wiki/Selections#on
  d3.select(window).on("resize." + container.attr("id"), resize);

  // get width of container and resize svg to fit it
  function resize() {
    var targetWidth = parseInt(container.style("width"));
    svg.attr("width", targetWidth);
    svg.attr("height", Math.round(targetWidth / aspect));
  }
}

const margins = { top: 50, right: 50, bottom: 50, left: 50 };

const Chart = () => {
  const [width, setWidth] = useState(400 + margins.left + margins.right);
  const [height, setHeight] = useState(300 + margins.bottom + margins.top);
  const [chartData, setChartData] = useState(transformData(data));
  const [transBitcoinData, setTransBitcoinData] = useState(bitcoinData);
  // The bitcoin data over time
  const [timeBitcoinData, setTimeBitcoinData] = useState<any[]>([]);
  const [minMax, setMinMax] = useState(getMinMax(transBitcoinData));
  let xScale: any;
  let yScale: any;
  let chart: any;

  function createChart() {
    chart = d3
      .select(".chart")
      .append("svg")
      .attr("width", width + margins.left + margins.right)
      .attr("height", height + margins.top + margins.bottom)
      // .call(responsivefy)
      .append("g")
      .attr("transform", `translate(${margins["left"]}, ${margins["top"]})`);

    xScale = d3
      .scaleTime()
      .domain([minMax.xMin, minMax.xMax])
      .range([0, width]);

    yScale = d3
      .scaleLinear()
      .domain([minMax.yMin, minMax.yMax])
      .range([height, 0]);

    chart
      .append("g")
      .attr("id", "xAxis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    chart
      .append("g")
      .attr("id", "yAxis")
      .attr("transform", `translate(${width}, 0)`)
      .call(d3.axisRight(yScale));

    // NOTE Line
    const line = d3
      .line()
      .x((d) => {
        // @ts-ignore
        return xScale(d.time);
      })
      .y((d) => {
        // @ts-ignore
        return yScale(d.close);
      });

    chart
      .append("path")
      .style("fill", "none")
      .attr("id", "priceChart")
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      // @ts-ignore
      .attr("d", line(progressiveData));

    // Moving average line
    const averageLine = d3
      .line()
      .x((d) => {
        // @ts-ignore
        return xScale(d.date);
      })
      .y((d) => {
        // @ts-ignore
        return yScale(d.average);
      })
      .curve(d3.curveBasis);

    const averageData = getAverage(transBitcoinData, transBitcoinData.length);

    chart
      .append("path")
      .data(averageData)
      .style("fill", "none")
      .attr("id", "averageLine")
      .attr("stroke", "gray")
      // @ts-ignore
      .attr("d", averageLine(averageData));
  }

  /**
   * Redraws the line of the chart
   */
  function updateChart() {
    // NOTE Line
    const line = d3
      .line()
      .x((d) => {
        // @ts-ignore
        return xScale(d.time);
      })
      .y((d) => {
        // @ts-ignore
        return yScale(d.close);
      });

    chart
      .append("path")
      .style("fill", "none")
      .attr("id", "priceChart")
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      // @ts-ignore
      .attr("d", line(progressiveData));
  }

  useEffect(() => {
    simulateAPI(transBitcoinData);
    createChart();
    const sub = data$.subscribe({
      next: (v: any) => {
        const copy = JSON.parse(JSON.stringify(v));
        progressiveData.push(...copy);
        updateChart();
      },
      error: (err) => {},
      complete: () => {
        sub.unsubscribe();
      },
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return <div className="chart"></div>;
};

export default Chart;
