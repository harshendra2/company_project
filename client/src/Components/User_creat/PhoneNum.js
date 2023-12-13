import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { setInput } from "../../Redux/image/imageSlice";

const PhoneNumberValidation = () => {
  const dispatch = useDispatch();
  const mobileNumber = useSelector((state) => state.input.value);
  console.log("Temp file", mobileNumber);

  const handleChange = (value) => {
    dispatch(setInput({ ...mobileNumber, MobileNumber: value }));
  };

  const [valid, setValid] = useState(true);

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  return (
    <div>
      <p className="text-teal-700 font-semibold">Mobile No:</p>
      <PhoneInput
        inputStyle={{
          width: "234px",
        }}
        country={"in"}
        onChange={handleChange}
        inputProps={{
          required: true,
        }}
      />
      {!valid && <p>Please enter a valid phone number.</p>}
    </div>
  );
};

export default PhoneNumberValidation;
