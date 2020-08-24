import React from "react";
import "./FormInput.styles.scss";

import { Input } from "antd";


const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className="input-container">
    {label ? <label>{label}</label> : null}
    <Input
      size="large"
      placeholder="large size"
      className="form-input"
      onChange={handleChange}
      {...otherProps}
    />
  </div>
);

export default FormInput;
