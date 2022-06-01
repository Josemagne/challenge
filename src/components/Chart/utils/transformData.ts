import { IData } from "../../../state/features/dataSlice";
import toDate from "./toDate";

const transformData = (data: any) => {
  const timeValues = Object.keys(data);
  const dataValues = Object.values(data as { [id: string]: IData });
  dataValues.forEach((d, i) => {
    // @ts-ignore
    d["time"] = toDate(timeValues[i], "h:m");
  });

  return dataValues;
};

export default transformData;
