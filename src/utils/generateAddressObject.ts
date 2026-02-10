import { add } from "lodash";
import parseAddress from "parse-address-string";

interface AddressObject {
  unit_type_1: string;
  unit_type_2: string;
  unit_number: string | number;
  street_number: string | number;
  street_address1: string | number;
  street_name: string;
  search_mode: string;
  city: string;
}

const validCities = ["toronto", "mississauga"];

const generateAddressObject = async ({
  addressQuery,
}: {
  addressQuery: string;
}) => {
  const addressObj: AddressObject = await new Promise((resolve, reject) => {
    parseAddress(`${addressQuery}`, function (err: any, addrObj: any) {
      if (err) {
        reject(err);
      } else {
        resolve(addrObj);
      }
    });
  });

  if (
    addressObj.city &&
    !validCities.includes(addressObj.city.toLowerCase()) &&
    !addressObj.street_address1
  ) {
    addressObj.street_address1 = addressObj.city;
    addressObj.city = "";
  }

  // extracting unit type
  const unitTypes = ["gph", "ph", "lph", "sph", "suite"];

  let unitTypesFound: string[] = [];
  let street_address1_copy = addressObj.street_address1;

  unitTypes.forEach((unitType) => {
    if (
      street_address1_copy &&
      (street_address1_copy as string)
        .toLowerCase()
        .includes(unitType.toLowerCase())
    ) {
      unitTypesFound.push(unitType);

      // now remove that text from the string
      street_address1_copy = (street_address1_copy as string)
        .toLowerCase()
        .replace(unitType.toLowerCase(), "");
    }
  });

  if (unitTypesFound.length > 0) {
    addressObj.unit_type_1 = unitTypesFound[0];
  }
  if (unitTypesFound.length > 1) {
    addressObj.unit_type_2 = unitTypesFound[1];
  }

  let address1_trimmed: string | number = "";
  if (addressObj.street_address1) {
    address1_trimmed = addressObj.street_address1;
    unitTypes.forEach((unitType) => {
      address1_trimmed = (address1_trimmed as string)
        .toLowerCase()
        .replace(new RegExp(unitType.toLowerCase(), "i"), "");
    });
  }

  address1_trimmed = (address1_trimmed as string)
    .replace("-", " ")
    .replace(".", " ")
    .trim();

  const address1_components = address1_trimmed.split(" ");

  switch (address1_components.length) {
    case 1:
      // if there's only one, assume this is the street name
      if (isNaN(Number(address1_components[0]))) {
        addressObj.street_name = address1_components[0];
      } else {
        addressObj.street_number = address1_components[0];
      }
      break;
    case 2:
      // if there's two, assume this is the street number and street name

      if (isNaN(Number(address1_components[0]))) {
        addressObj.street_name = address1_components.join(" ");
      } else {
        addressObj.street_number = address1_components[0];
        addressObj.street_name = address1_components[1];
      }
      break;
    default:
      let street_name_parts: string[] = [];
      for (let i = address1_components.length - 1; i >= 0; i--) {
        const component = address1_components[i];
        if (isNaN(Number(component))) {
          if (addressObj.street_number) {
            addressObj.unit_number = component;
          } else {
            street_name_parts.unshift(component);
          }
        } else if (!isNaN(Number(component)) || !addressObj.street_number) {
          if (!addressObj.street_number) {
            addressObj.street_number = component;
          } else if (!addressObj.unit_number) {
            addressObj.unit_number = component;
          }
        }
      }
      addressObj.street_name = street_name_parts.join(" ");
      // if there's three, assume this is the unit number, street number and street name

      break;
  }

  // determine search type based on fields that are defined
  // if only street address is defined
  addressObj.search_mode = "ALL";
  // if (
  //   addressObj.street_address1 &&
  //   !addressObj.street_number &&
  //   !addressObj.unit_type_1 &&
  //   !addressObj.unit_type_2 &&
  //   !addressObj.unit_number
  // ) {
  //   addressObj.search_mode = "STREET_NAME";
  // } else if (
  //   addressObj.street_name &&
  //   addressObj.street_number &&
  //   !addressObj.unit_number
  // ) {
  //   addressObj.search_mode = "STREET_NUMBER";
  // }

  return addressObj;
};

export default generateAddressObject;
