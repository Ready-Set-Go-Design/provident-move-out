import parseAddress from "parse-address-string";

const addresses = [
  ["SUITE 12 156 MERCHANTS' WHARF"],
  ["SUITE 1211 155 MERCHANTS' WHARF"],
  ["SUITE 1207 155 MERCHANTS' WHARF"],
  ["SUITE 1203 155 MERCHANTS' WHARF"],
  ["SUITE 1132 155 MERCHANTS' WHARF"],
  ["SUITE 1131 155 MERCHANTS' WHARF"],
  ["SUITE 1129 155 MERCHANTS' WHARF"],
  ["SUITE 1128 155 MERCHANTS' WHARF"],
  ["SUITE 1127 155 MERCHANTS' WHARF"],
  ["SUITE 1126 155 MERCHANTS' WHARF"],
  ["SUITE 1124 155 MERCHANTS' WHARF"],
  ["SUITE 1122 155 MERCHANTS' WHARF"],
  ["SUITE 1115 155 MERCHANTS' WHARF"],
  ["SUITE 1112 155 MERCHANTS' WHARF"],
  ["SUITE 1111 155 MERCHANTS' WHARF"],
  ["SUITE 1107 155 MERCHANTS' WHARF"],
  ["SUITE 1103 155 MERCHANTS' WHARF"],
  ["SUITE 1032 155 MERCHANTS' WHARF"],
  ["SUITE 1031 155 MERCHANTS' WHARF"],
  ["SUITE 1029 155 MERCHANTS' WHARF"],
  ["SUITE 1028 155 MERCHANTS' WHARF"],
  ["SUITE 1027 155 MERCHANTS' WHARF"],
  ["SUITE 1026 155 MERCHANTS' WHARF"],
  ["SUITE 1024 155 MERCHANTS' WHARF"],
  ["SUITE 1022 155 MERCHANTS' WHARF"],
  ["SUITE 1015 155 MERCHANTS' WHARF"],
  ["SUITE 1012 155 MERCHANTS' WHARF"],
  ["SUITE 1011 155 MERCHANTS' WHARF"],
  ["SUITE 1009 155 MERCHANTS' WHARF"],
  ["SUITE 1007 155 MERCHANTS' WHARF"],
  ["SUITE 1003 155 MERCHANTS' WHARF"],
  ["SUITE 1001 155 MERCHANTS' WHARF"],
  ["SUITE 932 155 MERCHANTS' WHARF"],
  ["SUITE 931 155 MERCHANTS' WHARF"],
  ["SUITE 929 155 MERCHANTS' WHARF"],
  ["SUITE 928 155 MERCHANTS' WHARF"],
  ["SUITE 927 155 MERCHANTS' WHARF"],
  ["SUITE 926 155 MERCHANTS' WHARF"],
  ["SUITE 925 155 MERCHANTS' WHARF"],
  ["SUITE 924 155 MERCHANTS' WHARF"],
  ["SUITE 922 155 MERCHANTS' WHARF"],
  ["SUITE PH09 10 INN ON THE PARK DRIVE"],
  ["SUITE PH04 10 INN ON THE PARK DRIVE"],
  ["SUITE PH03 10 INN ON THE PARK DRIVE"],
  ["SUITE GPH04 10 INN ON THE PARK DRIVE"],
  ["SUITE GPH03 10 INN ON THE PARK DRIVE"],
  ["SUITE 3709 10 INN ON THE PARK DRIVE"],
  ["SUITE 3704 10 INN ON THE PARK DRIVE"],
  ["SUITE 3703 10 INN ON THE PARK DRIVE"],
  ["SUITE 3609 10 INN ON THE PARK DRIVE"],
  ["SUITE 3604 10 INN ON THE PARK DRIVE"],
  ["SUITE 3603 10 INN ON THE PARK DRIVE"],
  ["SUITE 3509 10 INN ON THE PARK DRIVE"],
  ["SUITE 3504 10 INN ON THE PARK DRIVE"],
  ["SUITE 3503 10 INN ON THE PARK DRIVE"],
  ["SUITE 3409 10 INN ON THE PARK DRIVE"],
  ["SUITE 3404 10 INN ON THE PARK DRIVE"],
  ["SUITE 3403 10 INN ON THE PARK DRIVE"],
  ["SUITE 3309 10 INN ON THE PARK DRIVE"],
  ["SUITE 3304 10 INN ON THE PARK DRIVE"],
  ["SUITE 3303 10 INN ON THE PARK DRIVE"],
  ["SUITE 3209 10 INN ON THE PARK DRIVE"],
  ["SUITE 3204 10 INN ON THE PARK DRIVE"],
  ["SUITE 3203 10 INN ON THE PARK DRIVE"],
  ["SUITE 3109 10 INN ON THE PARK DRIVE"],
  ["SUITE 3107 10 INN ON THE PARK DRIVE"],
  ["SUITE 3105 10 INN ON THE PARK DRIVE"],
  ["SUITE 3104 10 INN ON THE PARK DRIVE"],
  ["SUITE 3103 10 INN ON THE PARK DRIVE"],
  ["SUITE 3101 10 INN ON THE PARK DRIVE"],
  ["SUITE 3009 10 INN ON THE PARK DRIVE"],
  ["SUITE 3007 10 INN ON THE PARK DRIVE"],
  ["SUITE 3005 10 INN ON THE PARK DRIVE"],
  ["SUITE 3004 10 INN ON THE PARK DRIVE"],
  ["SUITE 3003 10 INN ON THE PARK DRIVE"],
  ["SUITE 3001 10 INN ON THE PARK DRIVE"],
  ["SUITE 2909 10 INN ON THE PARK DRIVE"],
  ["SUITE 2907 10 INN ON THE PARK DRIVE"],
  ["SUITE 2905 10 INN ON THE PARK DRIVE"],
  ["SUITE 2904 10 INN ON THE PARK DRIVE"],
  ["SUITE 2903 10 INN ON THE PARK DRIVE"],
];

let addressObj;
addressObj = await new Promise((resolve, reject) => {
  parseAddress.explodeAddress(
    "SUITE GPH03 10 INN ON THE PARK DRIVE",
    function (err, addrObj) {
      if (err) {
        reject(err);
      } else {
        resolve(addrObj);
      }
    }
  );
});

// extracting unit type
const unitTypes = ["lph", "sph", "suite", "gph", "ph"];

let unitTypesFound = [];
let street_address1_copy = addressObj.street_address1;

unitTypes.forEach((unitType) => {
  if (
    street_address1_copy &&
    street_address1_copy.toLowerCase().includes(unitType.toLowerCase())
  ) {
    unitTypesFound.push(unitType);

    // now remove that text from the string
    street_address1_copy = street_address1_copy
      .toLowerCase()
      .replace(unitType.toLowerCase(), "");
  }
});

addressObj.unit_types = unitTypesFound;

let address1_trimmed;
if (addressObj.street_address1) {
  address1_trimmed = addressObj.street_address1;
  unitTypes.forEach((unitType) => {
    console.log("cheking");
    address1_trimmed = address1_trimmed
      .toLowerCase()
      .replace(new RegExp(unitType.toLowerCase(), "i"), "");
  });
}

address1_trimmed = address1_trimmed.replace("-", " ").replace(".", " ").trim();

console.log(address1_trimmed);

const address1_components = address1_trimmed.split(" ");
console.log(address1_components);

switch (address1_components.length) {
  case 1:
    // if there's only one, assume this is the street name
    addressObj.street_name = address1_components[0];
  case 2:
    // if there's two, assume this is the street number and street name
    addressObj.street_number = address1_components[0];
    addressObj.street_name = address1_components[1];
  case 3:
    // if there's three, assume this is the unit number, street number and street name
    addressObj.unit_number = address1_components[0];
    addressObj.street_number = address1_components[1];
    addressObj.street_name = address1_components[2];
    break;
  default:
    // if there's more than three, assume this is the unit number, street number and street name
    addressObj.unit_number = address1_components[0];
    addressObj.street_number = address1_components[1];
    addressObj.street_name = address1_components.slice(2).join(" ");
    break;
}

// SUITE 1128 155 MERCHANTS' WHARF

console.log(addressObj);

/* 
create array of address objects, based on the address strings
each object should contain the following properties:
unit_type
unit_number
street_address (ex: 155 merchants' wharf)
street_number (ex: 155);
street_name (ex: merchants' wharf or "inn on the park"
street_type (ex: street, avenue, drive)
city (default "Toronto" if not defined)
  

if search input field is a number, check first against ?
if search input field is a string, search against street name
if search input field is both, parse to search against street number and street name
if more than one number is included, assume that it's using the unit number and street number, compare against those as well as the address

return array should be a list of objects that match the search string


sample search strings:
"inn on the park"
-- should return list of unique address objects matching street_name

"10 inn on the park"
-- should return a list of unique address objects matching street name and street number

"21-10"
-- should return a list of unique address objects matching street name and street number, detailing street name

"10" 
-- should return a list of unique address objects matching the unit number

"ph", "suite", "lh"
-- should return a list of unique unit number and unit type combinations appearing in address objects matching the unit type
*/
