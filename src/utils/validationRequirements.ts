export const validationRequirements = [
  {
    id: "/",
    fields: [
      {
        name: "user_type",
      },
      { name: "moving_day", message: "Departure Day" },
      { name: "moving_month", message: "Departure Month" },
      { name: "moving_year", message: "Departure Year" },
      {
        name: "selling_or_renting",
        must_be: "selling",
        conditional: { id: "user_type", is: "HOME_OWNER" },
        message: "You must be selling your home to proceed",
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
    fields: [
      { name: "first_name" },
      { name: "last_name" },
      { name: "forwarding_address" },
      { name: "forwarding_city" },
      { name: "forwarding_province" },
      { name: "forwarding_country" },
      { name: "forwarding_postal_code" },
    ],
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
