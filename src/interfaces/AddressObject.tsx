export default interface AddressObject {
  street_address1: string | number;
  street_number: string | number;
  unit_type_1: string;
  unit_type_2?: string;
  unit_number: string | number;
  street_name: string;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
}
