const globalErrorHandler = (err, req, res, next) => {
  
  let code = err.statusCode ? err.statusCode : 500;

  res.status(code).json({
    statusCode: code,
    status: 'error',
    message: err.message,
  });
};

export default globalErrorHandler;
