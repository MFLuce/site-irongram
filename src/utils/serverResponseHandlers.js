export const onSuccess = (response) => {
  return {
    success: true,
    data: response.data,
  };
};

export const onError = (err) => {
  if (err?.response?.data) {
    // question mark syntax -> optional chaining
    // if axios was the reason for the error (therefore err.response is a thing)
    return {
      success: false,
      data: err.response.data.errorMessage,
    };
  }

  return {
    success: false,
    data: "Something happened",
  };
};
