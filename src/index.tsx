import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Price from "./components/price/Price";
import "./styles/sass.scss";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { dataStream } from "./state/middleware/data.middleware";
import useAppDispatch from "./hooks/useAppDispatch";
import Menu from "./components/menu/Menu";
import Actions from "./components/Actions/Actions";
import Chart from "./components/Chart/Chart";

const Index = () => {
  const dispatch = useAppDispatch();
  const [price, setPrice] = useState(805.9);
  /**
   * Possibilities: "1d" | "3d" | "1w" | "1m" | "6m" | "1y" | "max"
   */
  const [time, setTime] = useState("max");

  /**
   * Is true once the chart line has finished
   */
  const [activateTour, setActivateTour] = useState(false);

  useEffect(() => {}, []);
  return (
    <Provider store={store}>
      <div className="App">
        <Price price={price} />
        <Menu />
        <Actions setTime={setTime} />
        <Chart setPrice={setPrice} />
      </div>
    </Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById("root")
);
