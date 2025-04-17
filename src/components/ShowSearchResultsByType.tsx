import AddressObject from "../interfaces/AddressObject";

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
        <div>
          <div className="italic text-sm">
            Select a building on that street:
          </div>
          <div className="p-4 max-h-[200px] overflow-y-auto border-2 rounded-md">
            {uniqueStreetNames.map((streetName, index) => (
              <div
                key={index}
                className="cursor-pointer bg-blue-100 p-4 m-2 rounded-md"
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
