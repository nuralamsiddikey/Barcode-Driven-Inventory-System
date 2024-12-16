const globalErrorHandler = (err, req, res, next) => {
  let code = err.statusCode || 500;
  let message = err.message || "An unexpected error occurred";

  // Handle MongoDB duplicate key error (E11000)
  if (err.code === 11000) {
    const keyValue = err.keyValue || {}; // Extract duplicate key information
    const duplicateField = Object.keys(keyValue)[0]; // Get the field causing the conflict
    const duplicateValue = keyValue[duplicateField]; // Get the conflicting value
    message = `Duplicate value found for "${duplicateField}": "${duplicateValue}". Please use a unique value.`;
    code = 409; // Conflict status code
  }

  res.status(code).json({
    statusCode: code,
    status: "error",
    message,
  });
};

export default globalErrorHandler;
