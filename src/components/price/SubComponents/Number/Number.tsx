import React from "react";
import useAppSelector from "../../../../hooks/useAppSelector";
import { lastDataSelector } from "../../../../state/selectors/dataSelectors";
import "./number.scss";

/**
 * Component that shows the current price for the data
 * @returns
 */
const Number = () => {
  const lastData = useAppSelector(lastDataSelector);

  return (
    <div className="price__number__number">
      <h1>lastData: {lastData}</h1>
    </div>
  );
};

export default Number;
