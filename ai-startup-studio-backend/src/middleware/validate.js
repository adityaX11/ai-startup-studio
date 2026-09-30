export function validateBody(schema) {
  return (request, response, next) => {
    const result = schema.safeParse(request.body);

    if (!result.success) {
      return response.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'Request body is invalid.',
        details: result.error.flatten()
      });
    }

    request.body = result.data;
    next();
  };
}