import { IData } from "../../../state/features/dataSlice";
import * as d3 from "d3";

export default function getMinMax(chartData: IData[]) {
  // @ts-ignore
  const xMin: number = d3.min(chartData, (d) => {
    return d.time;
  });

  // @ts-ignore
  const xMax: number = d3.max(chartData, (d) => {
    return d.time;
  });

  // @ts-ignore
  const yMin: number = d3.min(chartData, (d) => {
    return d.close;
  });

  // @ts-ignore
  const yMax: number = d3.max(chartData, (d) => {
    return d.close;
  });

  return { xMin, xMax, yMin, yMax };
}
