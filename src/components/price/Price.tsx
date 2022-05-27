import React from "react";
import "./price.scss";
import Currency from "./SubComponents/Currency/Currency";
import Number from "./SubComponents/Number/Number";

const Price = () => {
  return (
    <div className="price">
      <div className="container">
        <div className="price__number">
          <Number />
        </div>
        <div className="price__currency">
          <Currency />
        </div>
      </div>
      <div className="price__change">
        <p className="price__change__change">+ 2,161.41 (3.54%)</p>
      </div>
    </div>
  );
};

export default Price;
