export const submitForm = async (formData: any) => {
  try {
    const sanitizedForm = { ...formData };
    // Remove any fields that are not needed for submission
    delete sanitizedForm.error;
    delete sanitizedForm.pageVisited;
    sanitizedForm.moving_date = `${sanitizedForm.moving_year}-${String(
      sanitizedForm.moving_month
    ).padStart(2, "0")}-${String(sanitizedForm.moving_day).padStart(2, "0")}`;
    delete sanitizedForm.moving_day;
    delete sanitizedForm.moving_month;
    delete sanitizedForm.moving_year;

    const response = await fetch("http://localhost:3002/move-out-submission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sanitizedForm),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error submitting form:", error);
    //@ts-ignore
    return { result: false, error: error.meessage };
  }
};
