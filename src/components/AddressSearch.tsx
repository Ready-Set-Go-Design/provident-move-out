import { useCallback, useEffect, useState } from "react";
import throttle from "lodash/throttle";
import { searchAddressesAsync } from "./../store/addressSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { RootState } from "../store/store";
import ShowSearchResultsByType from "./ShowSearchResultsByType";
import { updateField } from "../store/formSlice";
import ShowUnitResults from "./ShowUnitResults";
import { Button } from "./button";
import { withPrefix } from "../utils/withPrefix";
import { Table, TableBody, TableRow, TableCell } from "./table";
import { Input } from "./input";

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
          <strong>Enter Address</strong>
          <br />
          <span>
            Start typing the address below, then select from the available
            choices.
          </span>
        </div>
      )}

      {formData.selected_address !== "" && (
        <Table bleed>
          <TableBody>
            <TableRow>
              <TableCell className={withPrefix("font-medium")}>
                Building:
              </TableCell>
              <TableCell>{formData.selected_address}</TableCell>
              <TableCell className={withPrefix("text-sm text-right")}>
                <Button
                  plain
                  className={withPrefix("text-red-500")}
                  onClick={() => {
                    setUnitQuery("");
                    setSearchQuery("");
                    dispatch(
                      updateField({ field: "selected_address", value: "" })
                    );
                    setShowResults(false);
                  }}
                >
                  <span className={withPrefix("text-red-500")}>X</span>
                </Button>
              </TableCell>
            </TableRow>
            {formData.selected_unit !== "" && (
              <TableRow>
                <TableCell className={withPrefix("font-medium")}>
                  Unit:
                </TableCell>
                <TableCell>{formData.selected_unit}</TableCell>
                <TableCell
                  className={withPrefix("text-zinc-500 pf:text-right")}
                >
                  <Button
                    plain
                    onClick={() => {
                      setUnitQuery("");

                      dispatch(
                        updateField({ field: "selected_unit", value: "" })
                      );
                      setShowResults(false);
                    }}
                  >
                    <span className={withPrefix("text-red-500")}>X</span>
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {formData.selected_address === "" && (
        <Table bleed>
          <TableBody>
            <TableRow>
              <TableCell>
                <Input
                  type="text"
                  placeholder="Enter address"
                  value={searchQuery}
                  onChange={(e) => searchForAddresses(e.target.value)}
                />
              </TableCell>
              <TableCell className={withPrefix("text-right")}>
                <Button
                  plain
                  onClick={() => {
                    setUnitQuery("");
                    setSearchQuery("");
                    dispatch(
                      updateField({ field: "selected_address", value: "" })
                    );
                    setShowResults(false);
                  }}
                >
                  <span className={withPrefix("text-red-500")}>X</span>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
        <div>No results found</div>
      )}

      {formData.selected_address && formData.selected_address > "" && (
        <div className={withPrefix("mt-4 mb-4")}>
          {formData.selected_unit === "" && (
            <div>
              <strong>Suite or Unit Number</strong>
              <br />
              eg., 1507, 1001B, PH10
            </div>
          )}
          {formData.selected_unit === "" && (
            <Table bleed>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Input
                      type="text"
                      placeholder=""
                      value={unitQuery}
                      onChange={(e) => searchForUnits(e.target.value)}
                    />
                  </TableCell>
                  <TableCell className={withPrefix("text-right")}>
                    <Button
                      plain
                      onClick={() => {
                        setUnitQuery("");
                        setSearchQuery(formData.selected_address);
                        dispatch(
                          updateField({ field: "selected_unit", value: "" })
                        );
                        setShowResults(false);
                      }}
                    >
                      <span className={withPrefix("text-red-500")}>X</span>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
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
    </div>
  );
}

export default AddressSearch;
