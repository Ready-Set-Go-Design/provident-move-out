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
              "absolute l-0 t-0 mt-2 w-full md:w-auto max-w-[100%] p-4 max-h-[300px] overflow-y-auto border-2 border-gray-300 rounded-md z-10 bg-white shadow-lg"
            )}
          >
            <div className={withPrefix("italic text-sm")}>
              Select a building on that street:
            </div>
            {uniqueStreetNames.map((streetName, index) => (
              <div
                key={index}
                className={withPrefix(
                  "cursor-pointer bg-blue-100 p-4 m-2 rounded-md"
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
