import AddressObject from "../interfaces/AddressObject";
import { withPrefix } from "../utils/withPrefix";

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
    <div className={withPrefix("relative")}>
      <div
        className={withPrefix(
          "absolute l-0 t-0 mt-2 w-full md:w-auto max-w-[100%] p-4 max-h-[300px] overflow-y-auto border-2 border-gray-300 rounded-md z-10 bg-white shadow-lg"
        )}
      >
        <div className={withPrefix("italic text-sm")}>
          There are <strong>{uniqueUnitesAtStreetNumber.length}</strong> units
          in that building, please select one:
        </div>
        {uniqueUnitesAtStreetNumber.map((streetName, index) => (
          <div
            key={index}
            className={withPrefix(
              "cursor-pointer bg-blue-100 p-4 m-2 rounded-md"
            )}
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
