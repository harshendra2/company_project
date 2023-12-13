// imageSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const imageSlice = createSlice({
  name: "image",
  initialState: {
    value: {
      FirstName: " ",
      LastName: " ",
      email: "",
      MobileNumber: " ",
      Address1: " ",
      Address2: " ",
      State: " ",
      City: " ",
      Country: " ",
      ZipCode: "",
    },
  },
  reducers: {
    setInput: (state, action) => {
  
      state.value = action.payload; // Correct the assignment
    },
    resetInput: (state) => {
      state.value = {
        FirstName: " ",
        LastName: " ",
        email: "",
        MobileNumber: " ",
        Address1: " ",
        Address2: " ",
        State: " ",
        City: " ",
        Country: " ",
        ZipCode: "",
      };
    },
  },
});

export const { setInput, resetInput } = imageSlice.actions;
export default imageSlice.reducer;


