exports.success = function (req, res, message, status) {
  let statusCode = status || 200;
  let statusMessage = message || '';
  res.status(statusCode).send({
    error: '',
    status: status,
    body: statusMessage,
  });
}

exports.error = function (req, res, error, status, detail) {
  let statusCode = status || 500;
  let statusError = error || 'Internal Error';

  console.log(detail);

  res.status(statusCode).send({
    error: statusError,
    status: status,
    body: false,
  });
}