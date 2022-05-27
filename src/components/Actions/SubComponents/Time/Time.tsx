import React, { useState } from "react";
import "./time.scss";

const Time = () => {
  // NOTE Here also. This would be in the store
  const [selectedTime, setSelectedTime] = useState("1w");

  const timeData = ["1d", "3d", "1w", "1m", "6m", "1y", "max"];

  function clickHandler(timeName: string) {
    setSelectedTime(timeName);
  }

  const timeDataMetadata = timeData.map((t) => {
    return {
      name: t,
      class: selectedTime === t ? `selected time__${t}` : `time__${t}`,
      clickHandler: () => clickHandler(t),
    };
  });

  return (
    <div className="time">
      {timeDataMetadata.map((t) => {
        return (
          <div className={t.class} onClick={t.clickHandler}>
            <p>{t.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Time;
