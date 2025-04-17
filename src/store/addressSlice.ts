import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import generateAddressObject from "../utils/generateAddressObject";
import masterAddressList from "../utils/masterAddressList";
import AddressObject from "../interfaces/AddressObject";

export interface Address {
  id?: string;
  address: string;
}

export interface AddressState {
  addresses: AddressObject[];
  filteredAddresses?: string[][];
  searchResultsType?: string;
}

const initialState: AddressState = {
  // TODO: Replace with external file or api call
  filteredAddresses: [],
  searchResultsType: "ALL",
  addresses: masterAddressList,
};

export const searchAddressesAsync = createAsyncThunk<
  {
    searchResultsType: string | undefined;
    filteredAddresses: string[][];
  },
  { addressQuery: string }
>("address/searchAddressesAsync", async ({ addressQuery }, { getState }) => {
  const formData = getState() as { form: { selected_address: string } };
  ` 
`;

  const addressObject = await generateAddressObject({
    addressQuery: addressQuery,
  });
  const state = getState() as { address: AddressState };

  const filteredAddresses: any = state.address.addresses.filter((address) => {
    // switch (formData.selected_address as string) {

    if (!addressObject.street_name && address.street_number) {
      return String(address.street_number).includes(
        addressObject.street_number as string
      );
    }
    //   case "STREET_NAME":
    if (address.street_name) {
      const streeet_name_matching = address.street_name
        .replace("'", "")
        .replace("'", "")
        .toLowerCase()
        .includes(
          (addressObject.street_name as string).replace("'", "").toLowerCase()
        );

      if (addressObject.street_number) {
        const street_number_matching = String(address.street_number).includes(
          addressObject.street_number as string
        );
        return street_number_matching && streeet_name_matching;
      } else {
        return streeet_name_matching;
      }
    }

    return false;
    // break;
    //   case "STREET_NUMBER":
    // return (
    //   address.street_name
    //     .replace("'", "")
    //     .replace("'", "")
    //     .toLowerCase()
    //     .includes(
    //       (addressObject.street_name as string)
    //         .replace("'", "")
    //         .toLowerCase()
    //     ) &&
    //   (address.street_number as string).toLowerCase() ===
    //     (addressObject.street_number as string).toLowerCase()
    // );
    // break;
    // }
  });
  // return address[0].toLowerCase().includes(query.toLowerCase())

  return { filteredAddresses, searchResultsType: addressObject.search_mode };
});

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchAddressesAsync.fulfilled, (state, action) => {
      state.filteredAddresses = action.payload.filteredAddresses;
      state.searchResultsType = action.payload.searchResultsType;
    });
  },
});

export const {} = addressSlice.actions;
export default addressSlice.reducer;
