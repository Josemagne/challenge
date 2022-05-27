import { from, interval, Observable, of, Subject, zip, map } from "rxjs";

const data = fetch("../../assets/data/data.json").then((data) => data.json);

const dataObservable = from([Object.values(data)]);

export const dataStream = dataObservable.pipe();
