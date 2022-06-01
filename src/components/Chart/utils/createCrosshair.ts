import * as d3 from "d3";
import { IData } from "../../../state/features/dataSlice";

let focus: any;

export default function createCrosshair(
  chart: any,
  width: number,
  height: number
) {
  focus = chart.append("g").attr("class", "focus").style("display", "none");
  focus.append("circle").attr("r", 4.5);
  focus.append("line").classed("x", true);
  focus.append("line").classed("y", true);
  chart
    .append("rect")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height)
    .on("mouseover", () => focus.style("display", null))
    .on("mouseout", () => focus.style("display", "none"))
    .on("mousemove", generateCrosshair);
  d3.select(".overlay").style("fill", "none");
  d3.select(".overlay").style("pointer-events", "all");
  d3.selectAll(".focus line").style("fill", "none");
  d3.selectAll(".focus line").style("stroke", "#67809f");
  d3.selectAll(".focus line").style("stroke-width", "1.5px");
  d3.selectAll(".focus line").style("stroke-dasharray", "3 3");
}

const bisectDate = d3.bisector((d: IData) => d.time).left;

function generateCrosshair(data: IData[], xScale: any) {
  //returns corresponding value from the domain
  // @ts-ignore
  const correspondingDate = xScale.invert(d3.pointer(this)[0]);

  //gets insertion point
  const i = bisectDate(data, correspondingDate, 1);
  const d0 = data[i - 1];
  const d1 = data[i];
  const currentPoint =
    correspondingDate - d0["time"] > d1["time"] - correspondingDate ? d1 : d0;

  focus.attr(
    "transform",
    `translate(${xScale(currentPoint["date"])},     ${yScale(
      currentPoint["close"]
    )})`
  );
  focus
    .select("line.x")
    .attr("x1", 0)
    .attr("x2", width - xScale(currentPoint["date"]))
    .attr("y1", 0)
    .attr("y2", 0);
  focus
    .select("line.y")
    .attr("x1", 0)
    .attr("x2", 0)
    .attr("y1", 0)
    .attr("y2", height - yScale(currentPoint["close"]));
  updateLegends(currentPoint);
}
