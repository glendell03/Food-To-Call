import React from "react";
import "./CustomButton.styles.scss"

const CustomButton = ({ children, ...otherProps }) => (
  <button {...otherProps} className="custom-button">
    {children}
  </button>
);

export default CustomButton;
