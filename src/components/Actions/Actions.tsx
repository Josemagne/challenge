import React from "react";
import Fullscreen from "./SubComponents/Fullscreen/Fullscreen";
import Compare from "./SubComponents/Compare/Compare";
import Time from "./SubComponents/Time/Time";
import "./actions.scss";

interface ActionsProps {
  setTime: React.Dispatch<React.SetStateAction<string>>;
}

const Actions = ({ setTime }: ActionsProps) => {
  return (
    <div className="actions">
      <div className="actions__fullscreen">
        <Fullscreen />
      </div>
      <div className="actions__compare">
        <Compare />
      </div>
      <div className="actions__time">
        <Time setTime={setTime} />
      </div>
    </div>
  );
};

export default Actions;
