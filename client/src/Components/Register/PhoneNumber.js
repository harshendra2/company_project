import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Register.css";

const PhoneNumberValidation = ({ input, Number }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);

  const handleChange = (value) => {
    Number({ ...input, MobileNumber: value });
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

    return phoneNumberPattern.test(phoneNumber);
  };

  return (
    <div>
      <div className="input-group form-group" style={{ marginBottom: "20px" }}>
        <PhoneInput
          className="form-control"
          country={"in"}
          value={phoneNumber}
          name="MobileNumber"
          onChange={handleChange}
          inputProps={{
            required: true,
          }}
        />
        {!valid && <p>Please enter a valid phone number.</p>}
      </div>
    </div>
  );
};

export default PhoneNumberValidation;
