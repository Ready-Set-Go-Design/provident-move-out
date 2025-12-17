import { useCallback, useEffect, useState } from "react";
import throttle from "lodash/throttle";
import { searchAddressesAsync } from "./../store/addressSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { RootState } from "../store/store";
import ShowSearchResultsByType from "./ShowSearchResultsByType";
import { updateField } from "../store/formSlice";
import ShowUnitResults from "./ShowUnitResults";
import { withPrefix } from "../utils/withPrefix";
import { Input } from "./input";
import { SearchIcon } from "./icons/SearchIcon";
import { CloseIcon } from "./icons/CloseIcon";
import { formatProdErrorMessage } from "@reduxjs/toolkit";

function AddressSearch() {
  const [unitQuery, setUnitQuery] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const searchResults = useSelector(
    (state: RootState) => state.address.filteredAddresses || []
  );
  const [showResults, setShowResults] = useState<boolean>(
    searchResults.length > 0 ? true : false
  );

  const [customerNumber, setCustomerNumber] = useState<string>("");

  const formData = useSelector((state: RootState) => state.form);
  const [searchQuery, setSearchQuery] = useState<string>(
    formData.selected_address || ""
  );

  const throttledSearch = useCallback(
    throttle(
      (addressQuery: string) => {
        dispatch(searchAddressesAsync({ addressQuery }));

        if (addressQuery.length > 0) {
          setShowResults(true);
        } else {
          setShowResults(false);
        }
      },
      750,
      { leading: false }
    ),
    [dispatch]
  );

  const searchForAddresses = (query: string) => {
    setSearchQuery(query);
    throttledSearch(query);
    dispatch(updateField({ field: "selected_address", value: "" }));
  };

  const searchForUnits = (query: string) => {
    setUnitQuery(query);
    setShowResults(true);
    // throttledSearch(searchQuery, query);
    // console.log("Searching for units:", query);
    dispatch(updateField({ field: "selected_unit", value: "" }));
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      throttledSearch(searchQuery);
    }
  }, []);

  const searchForAddressesImmediately = (query: string) => {
    setSearchQuery(query);
    dispatch(searchAddressesAsync({ addressQuery: query }));

    if (query.length > 0) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const selectThisAddress = (address: string) => {
    setSearchQuery(address);
    dispatch(updateField({ field: "selected_address", value: address }));

    // searchForAddressesImmediately(address);
  };

  const selectThisUnit = (unit: string) => {
    setUnitQuery(unit);
    dispatch(updateField({ field: "selected_unit", value: unit }));
  };

  return (
    <div className={withPrefix("mt-4 mb-4")}>
      {formData.selected_address === "" && (
        <div>
          <div
            className={withPrefix(
              "font-semibold text-md mt-6 mb-2 text-gray-900"
            )}
          >
            Enter address
          </div>

          <span className={withPrefix("text-gray-500 mb-2 block")}>
            Start typing the address below, then select from the available
            choices.
          </span>
        </div>
      )}

      {formData.selected_address !== "" && (
        <div className={withPrefix(" flex w-full justify-between capitalize")}>
          <div>
            <div className={withPrefix("font-semibold text-gray-900")}>
              {formData.selected_address}
            </div>
            {formData.selected_unit && formData.selected_unit > "" && (
              <div className={withPrefix("font-normal text-gray-600")}>
                {formData.selected_unit}
              </div>
            )}
          </div>
          <div className={withPrefix("text-sm")}>
            <div
              className={withPrefix(
                "text-gray-400 rounded-full hover:text-gray-600 cursor-pointer"
              )}
              onClick={() => {
                setUnitQuery("");
                setSearchQuery("");
                dispatch(updateField({ field: "selected_address", value: "" }));
                dispatch(updateField({ field: "selected_unit", value: "" }));
                setShowResults(false);
              }}
            >
              <CloseIcon />
            </div>
          </div>
        </div>
      )}

      {formData.selected_address === "" && (
        <div
          className={withPrefix(
            "flex border shadow-md rounded-md border-gray-300 p-1 pt-1 justify-between items-center w-full"
          )}
        >
          <div>
            <SearchIcon />
          </div>
          <Input
            type="text"
            placeholder="Enter address"
            value={searchQuery}
            onChange={(e) => searchForAddresses(e.target.value)}
          />
          {searchQuery > "" && (
            <div
              className={withPrefix(
                "text-gray-400 rounded-full hover:text-gray-600 cursor-pointer"
              )}
              onClick={() => {
                setUnitQuery("");
                setSearchQuery("");
                dispatch(updateField({ field: "selected_address", value: "" }));
                setShowResults(false);
              }}
            >
              <CloseIcon />
            </div>
          )}
        </div>
      )}

      {searchResults.length > 0 &&
        showResults === true &&
        (!formData.selected_address || formData.selected_address === "") && (
          <ShowSearchResultsByType
            searchResults={searchResults as any}
            selectThisAddress={selectThisAddress}
            formData={formData}
          />
        )}

      {searchResults.length === 0 && showResults === true && (
        <div className={withPrefix("text-sm text-gray-400 mt-2")}>
          No results found
        </div>
      )}

      {formData.selected_address && formData.selected_address > "" && (
        <div className={withPrefix("mt-4 mb-4")}>
          {formData.selected_unit === "" && (
            <div className={withPrefix("text-md mb-2 text-gray-900 mb-2")}>
              <strong>Suite or Unit Number</strong>

              <div className={withPrefix("text-gray-500")}>
                eg., 1507, 1001B, PH10
              </div>
            </div>
          )}
          {formData.selected_unit === "" && (
            <div
              className={withPrefix(
                "flex border shadow-md rounded-md border-gray-300 p-1 pt-1 justify-between items-center w-full"
              )}
            >
              <div>
                <SearchIcon />
              </div>
              <Input
                type="text"
                placeholder=""
                value={unitQuery}
                onChange={(e) => searchForUnits(e.target.value)}
              />

              {unitQuery > "" && (
                <div
                  className={withPrefix(
                    "text-gray-400 rounded-full hover:text-gray-600 cursor-pointer"
                  )}
                  onClick={() => {
                    setUnitQuery("");
                    setSearchQuery(formData.selected_address);
                    dispatch(
                      updateField({ field: "selected_unit", value: "" })
                    );
                    setShowResults(false);
                  }}
                >
                  <CloseIcon />
                </div>
              )}
            </div>
          )}
          {searchResults.length > 0 &&
            showResults === true &&
            (!formData.selected_unit || formData.selected_unit === "") && (
              <ShowUnitResults
                searchResults={searchResults as any}
                formData={formData}
                unitQuery={unitQuery}
                selectThisUnit={selectThisUnit}
              />
            )}
        </div>
      )}
      {formData.selected_address && formData.selected_unit && (
        <div>
          <div
            className={withPrefix(
              "font-semibold text-md mt-6 mb-2 text-gray-900"
            )}
          >
            Customer Number
          </div>

          <span className={withPrefix("text-gray-500 mb-2 block")}>
            The customer number entered MUST match the one we have on record.
          </span>

          <div
            className={withPrefix(
              "flex border shadow-md rounded-md border-gray-300 p-1 pt-1 justify-between items-center w-full"
            )}
          >
            <Input
              type="text"
              placeholder="Enter Number"
              value={formData.customer_number}
              readOnly={formData.code_verified}
              onChange={(e) => {
                setCustomerNumber(e.target.value);
                dispatch(
                  updateField({
                    field: "customer_number",
                    value: e.target.value,
                  })
                );
              }}
            />
            {searchQuery > "" && !formData.code_verified && (
              <div
                className={withPrefix(
                  "text-gray-400 rounded-full hover:text-gray-600 cursor-pointer"
                )}
                onClick={() => {
                  setCustomerNumber("");

                  dispatch(
                    updateField({ field: "customer_number", value: "" })
                  );
                }}
              >
                <CloseIcon />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddressSearch;
