import React from "react";
import { Quantity, ControlButton } from "./styles";

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onIncrease,
  onDecrease,
}) => {
  return (
    <Quantity>
      <ControlButton onClick={onDecrease}>-</ControlButton>
      <ControlButton>{quantity}</ControlButton>
      <ControlButton onClick={onIncrease}>+</ControlButton>
    </Quantity>
  );
};

export default QuantityControl;
