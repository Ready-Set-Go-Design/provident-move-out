import AddressObject from "../interfaces/AddressObject";
import { withPrefix } from "../utils/withPrefix";

const ShowSearchResultsByType = ({
  searchResults,
  selectThisAddress,
  formData,
}: {
  searchResults: any;
  selectThisAddress: Function;
  formData: any;
}) => {
  // console.log("searchResultsType", searchResultsType);
  switch (formData.selected_address) {
    case "":
      const uniqueStreetNames: string[] = [];

      searchResults.map((address: AddressObject) => {
        const addr = `${address.street_number} ${address.street_name}`;

        if (!uniqueStreetNames.includes(addr)) {
          uniqueStreetNames.push(addr);
        }
      });

      return (
        <div className={withPrefix("relative")}>
          <div
            className={withPrefix(
              "absolute l-0 t-0 w-full max-w-[100%] max-h-[300px] overflow-y-auto border-2 border-gray-300 rounded-lg z-10 bg-white shadow-lg"
            )}
          >
            {uniqueStreetNames.map((streetName, index) => (
              <div
                key={index}
                className={withPrefix(
                  "cursor-pointer text-gray-900 uppercase hover:bg-(--primary-color) hover:text-white p-2"
                )}
                onClick={() => selectThisAddress(streetName)}
              >
                {streetName}
              </div>
            ))}
          </div>
        </div>
      );
  }

  //   default:
  //     return <div></div>;
  // }
};

export default ShowSearchResultsByType;
