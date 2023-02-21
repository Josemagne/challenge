import { useState, useEffect } from "react";
import "./price.scss";
import Currency from "./SubComponents/Currency/Currency";
import Number from "./SubComponents/Number/Number";

interface PriceProps {
  price: number;
}

const Price = ({ price }: PriceProps) => {
  const [_price, _setPrice] = useState(price);

  const calculateDifferenceInPercentage = (
    prev: number,
    current: number
  ): number => {
    const res = (current / prev) * 100;
    console.log(`res: ${res}`);
    return res;
  };

  useEffect(() => {
    _setPrice(price);
  }, [price]);

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
        {/* <p className="price__change__change">+ 2,161.41 (3.54%)</p> */}
        <p className="price__change__change">{price}</p>
      </div>
    </div>
  );
};

export default Price;
