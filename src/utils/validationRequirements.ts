export const validationRequirements = [
  { id: "/", fields: ["occupancy_type", "occupancy_date"] },
  { id: "/page2", fields: ["selected_address", "selected_unit"] },
  {
    id: "/page3",
    fields: ["first_name", "last_name", "business_name", "email"],
  },
  {
    id: "/page4",
    fields: ["payment_mode", "accept_preauth_terms_and_conditions"],
  },
  {
    id: "/page5",
    fields: [
      {
        conditional: "payment_mode",
        value: "provide_banking_information",
        id: "branch_transit_number",
      },
      {
        conditional: "payment_mode",
        value: "provide_banking_information",
        id: "bank_account_number",
      },
      {
        conditional: "payment_mode",
        value: "provide_banking_information",
        id: "financial_institution_number",
      },
      {
        conditional: "payment_mode",
        value: "provide_void_cheque",
        id: "void_cheque_image",
      },
    ],
  },
  { id: "/page6", fields: ["accept_preauth_terms_and_conditions"] },
  { id: "/page7", fields: [] },
  { id: "/page8", fields: ["verify_entered_information", "signature_image"] },
  { id: "/page9", fields: [] },
];
