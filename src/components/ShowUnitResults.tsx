import AddressObject from "../interfaces/AddressObject";

const ShowUnitResults = ({
  searchResults,
  unitQuery,
  selectThisUnit,
  formData,
}: {
  searchResults: any;
  unitQuery: string;
  selectThisUnit: Function;
  formData: any;
}) => {
  // console.log("searchResultsType", searchResultsType);

  const uniqueUnitesAtStreetNumber: any[] = [];

  searchResults
    .filter((address: AddressObject) =>
      (address.street_address1 as string)
        .toLowerCase()
        .includes(unitQuery.toLowerCase())
    )
    .map((address: AddressObject) => {
      if (
        !uniqueUnitesAtStreetNumber.find(
          (unit) => unit.unit_number === address.unit_number
        )
      ) {
        uniqueUnitesAtStreetNumber.push({
          unit_number: [
            address.unit_type_1,
            address.unit_type_2,
            address.unit_number,
          ]
            .filter((item) => item !== undefined && item !== "")
            .join(" "),
          street_address: `${address.unit_number} ${address.street_number} ${address.street_name}`,
          street_name: address.street_name,
        });
      }
    });

  if (unitQuery.length === 0) {
    return <div></div>;
  }

  return (
    <div>
      <div className="italic text-sm">
        There are <strong>{uniqueUnitesAtStreetNumber.length}</strong> units in
        that building, please select one:
      </div>
      <div className="p-4 max-h-[200px] overflow-y-auto border-2 rounded-md">
        {uniqueUnitesAtStreetNumber.map((streetName, index) => (
          <div
            key={index}
            className="cursor-pointer bg-blue-200 p-4 rounded-md m-2"
            onClick={() => selectThisUnit(streetName.unit_number)}
            // onClick={() => searchForAddresses(`${streetName.street_address}`)}
          >
            {streetName.unit_number}
          </div>
        ))}
      </div>
    </div>
  );

  //   default:
  //     return <div></div>;
  // }
};

export default ShowUnitResults;
