export const isFormDataValid = (formData: any) => {
  const requiredFields = [
    "first_name",
    "last_name",
    "business_name",
    "email",
    "occupancy_type",
    "occupancy_day",
    "occupancy_month",
    "occupancy_year",
    "service_address",
    "signature_image",
  ];

  // Check if all required fields are filled
  for (const field of requiredFields) {
    if (!formData[field]) {
      return false;
    }
  }

  // Check if the email is valid
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(formData.email)) {
    return false;
  }

  return true;
};
