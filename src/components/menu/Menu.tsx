import React, { useEffect, useState } from "react";
import "./menu.scss";

const Menu = () => {
  // NOTE When the app is more elaborate we can put this state to the store. Then other components can pick it up and render accordingly
  const [activeTab, setActiveTab] = useState("Chart");

  const tabsName = ["Summary", "Chart", "Statistics", "Analysis", "Settings"];

  function clickHandler(tabName: string) {
    setActiveTab(tabName);
    console.log(tabName);
  }

  const tabs = tabsName.map((t) => {
    return {
      name: t,
      // NOTE The function checks if the current tab is the one that is clicked
      class: () => {
        return activeTab === t
          ? `active menu__${t.toLowerCase()}`
          : `menu__${t.toLowerCase()}`;
      },
      clickHandler: () => clickHandler(t),
    };
  });

  return (
    <div className="menu">
      {tabs.map((t) => {
        return (
          <div className={`${t.class()}`} onClick={t.clickHandler}>
            <p>{t.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
