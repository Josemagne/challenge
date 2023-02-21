import React, { useState } from "react";
import "./time.scss";

type TimeString = "1d" | "3d" | "1w" | "1m" | "6m" | "1y" | "max";
const timeData: TimeString[] = ["1d", "3d", "1w", "1m", "6m", "1y", "max"];

interface TimeProps {
  setTime: React.Dispatch<React.SetStateAction<string>>;
}

const Time = ({ setTime }: TimeProps) => {
  // NOTE Here also. This would be in the store
  const [selectedTime, setSelectedTime] = useState("1w");
  const [_time, _setTime] = useState("max");

  function clickHandler(timeName: TimeString) {
    setSelectedTime(timeName);
    _setTime(timeName);
    setTime(timeName);
  }

  const timeDataMetadata = timeData.map((t) => {
    return {
      name: t,
      className: selectedTime === t ? `selected time__${t}` : `time__${t}`,
      onClick: () => clickHandler(t),
    };
  });

  return (
    <div className="time">
      {timeDataMetadata.map((t) => {
        return (
          <div {...timeDataMetadata}>
            <p>{t.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Time;
