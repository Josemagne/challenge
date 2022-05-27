import React, { useEffect } from "react";
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
  useEffect(() => {
    // Note When the component is rendered we fetch /assets/data/data.json
  }, []);
  return (
    <Provider store={store}>
      <div className="App">
        <Price />
        <Menu />
        <Actions />
        <Chart />
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
