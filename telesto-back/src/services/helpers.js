function sendError(res, httpCode, error) {
    return res.status(httpCode).json({
        code: error.code,
        message: error.message
    })
}

export { sendError }