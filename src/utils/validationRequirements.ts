export const validationRequirements = [
  {
    id: "/",
    fields: [
      { name: "occupancy_type" },
      { name: "occupancy_day", message: "Departure Day" },
      { name: "occupancy_month", message: "Departure Month" },
      { name: "occupancy_year", message: "Departure Year" },
      {
        conditional: "occupancy_type",
        value: "HOME_OWNER",
        id: "renting_or_selling",
      },
      {
        name: "renting_or_selling",
        must_be: "selling",
        message: " ",
      },
    ],
  },
  {
    id: "/page2",
    fields: [
      { name: "selected_address" },
      { name: "selected_unit" },
      { name: "customer_number" },
    ],
  },
  {
    id: "/page3",
    fields: [{ name: "code_verified" }],
  },
  {
    id: "/page4",
    fields: [{ name: "first_name" }, { name: "last_name" }],
  },
  {
    id: "/page5",
    fields: [
      {
        name: "lawyer_first_name",
      },
      {
        name: "lawyer_last_name",
      },
      {
        name: "lawyer_phone",
        minLength: 10,
      },
    ],
  },
  {
    id: "/page6",
    fields: [
      { name: "verify_entered_information" },
      { name: "signature_image" },
    ],
  },
  { id: "/page7", fields: [] },
];
