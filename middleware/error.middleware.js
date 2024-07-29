export const middlewareError = (err, res, next) => {
  err.message = err.message || "internal  error";
  err.statusCode = err.statusCode || 500;
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
