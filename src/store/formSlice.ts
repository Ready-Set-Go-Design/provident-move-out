import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormState {
  [key: string]: string | string[] | undefined | boolean;
  occupancy_type: "TENANT" | "HOME_OWNER" | "";
  code_verified: boolean;
  renting_or_selling: string;
  customer_number: string;
  occupancy_day: string;
  occupancy_month: string;
  occupancy_year: string;
  selected_address: string;
  selected_unit: string;
  first_name: string;
  last_name: string;
  business_name: string;
  email: string;
  accept_terms_and_conditions: string;
  verify_entered_information?: string;
  signature_image: string;
  lawyer_first_name: string;
  lawyer_last_name: string;
  lawyer_phone: string;
  pageVisited: string[];
}

export const emptyForm: FormState = {
  code_verified: false,
  customer_number: "",
  renting_or_selling: "",
  selected_address: "",
  selected_unit: "",
  occupancy_type: "",
  occupancy_day: "",
  occupancy_month: "",
  occupancy_year: "",
  first_name: "",
  last_name: "",
  business_name: "",
  email: "",
  lawyer_first_name: "",
  lawyer_last_name: "",
  lawyer_phone: "",
  accept_terms_and_conditions: "",
  verify_entered_information: "",
  signature_image: "",
  pageVisited: [],
};

const getInitialState = (): FormState => {
  const savedData = localStorage.getItem("moveoutFormData");
  if (savedData) {
    return JSON.parse(savedData);
  }
  return JSON.parse(JSON.stringify(emptyForm)) as FormState;
};

const formSlice = createSlice({
  name: "form",
  initialState: getInitialState(),
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: keyof FormState; value: string | boolean }>
    ) => {
      const { field, value } = action.payload;
      if (field !== "pageVisited") {
        state[field] = value;
      }
      try {
        localStorage.setItem("moveoutFormData", JSON.stringify(state));
      } catch (error) {}
    },
    clearForm: (state) => {
      const emptyFormInstance = Object.assign(
        state,
        JSON.parse(JSON.stringify(emptyForm)) as FormState
      );
      localStorage.setItem(
        "moveoutFormData",
        JSON.stringify(emptyFormInstance)
      );
    },
    addPageVisit: (state, action: PayloadAction<string>) => {
      if (!state.pageVisited.includes(action.payload)) {
        state.pageVisited.push(action.payload);
        localStorage.setItem("moveoutFormData", JSON.stringify(state));
      }
    },
  },
});

export const { updateField, clearForm, addPageVisit } = formSlice.actions;
export default formSlice.reducer;
