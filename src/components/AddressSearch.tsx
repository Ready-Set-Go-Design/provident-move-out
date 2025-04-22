import { useCallback, useEffect, useState } from "react";
import throttle from "lodash/throttle";
import { searchAddressesAsync } from "./../store/addressSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { RootState } from "../store/store";
import ShowSearchResultsByType from "./ShowSearchResultsByType";
import { updateField } from "../store/formSlice";
import { TrashIcon } from "@heroicons/react/16/solid";
import ShowUnitResults from "./ShowUnitResults";
import { Button } from "./button";
import { withPrefix } from "../utils/withPrefix";

function AddressSearch() {
  const [unitQuery, setUnitQuery] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const searchResults = useSelector(
    (state: RootState) => state.address.filteredAddresses || []
  );
  const [showResults, setShowResults] = useState<boolean>(
    searchResults.length > 0 ? true : false
  );

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
    <div>
      <div className={withPrefix("mt-4 mb-4")}>
        {formData.selected_address === "" && (
          <div>
            <strong>Enter Address</strong>
            <br />
            <span>
              Start typing the address below, then select from the available
              choices.
            </span>
          </div>
        )}
        <div className={withPrefix("flex gap-2")}>
          {formData.selected_address === "" && (
            <input
              type="text"
              placeholder="Enter address"
              className={withPrefix(
                "w-full p-2 border-2 border-solid rounded-md border-gray-300"
              )}
              value={searchQuery}
              onChange={(e) => searchForAddresses(e.target.value)}
            />
          )}
          {formData.selected_address !== "" && (
            <div>
              You've selected: <strong>{formData.selected_address}</strong>
            </div>
          )}
          <Button
            color="red"
            onClick={() => {
              setUnitQuery("");
              setSearchQuery("");
              dispatch(updateField({ field: "selected_address", value: "" }));
              setShowResults(false);
            }}
          >
            <TrashIcon />
          </Button>
        </div>
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
          <div>No results found</div>
        )}
      </div>
      {formData.selected_address && formData.selected_address > "" && (
        <div className={withPrefix("mt-4 mb-4")}>
          {formData.selected_unit === "" && (
            <div>
              <strong>Suite or Unit Number</strong>
              <br />
              eg., 1507, 1001B, PH10
            </div>
          )}
          <div className={withPrefix("flex gap-2")}>
            {formData.selected_unit === "" && (
              <input
                type="text"
                placeholder=""
                className={withPrefix(
                  "w-full p-2 border-2 border-solid rounded-md border-gray-300"
                )}
                value={unitQuery}
                onChange={(e) => searchForUnits(e.target.value)}
              />
            )}
            {formData.selected_unit !== "" && (
              <div className="">
                You've selected: <strong>{formData.selected_unit}</strong>
              </div>
            )}
            <Button
              color="red"
              onClick={() => {
                setUnitQuery("");
                setSearchQuery(formData.selected_address);
                dispatch(updateField({ field: "selected_unit", value: "" }));
                setShowResults(true);
              }}
            >
              <TrashIcon />
            </Button>
          </div>
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
    </div>
  );
}

export default AddressSearch;
