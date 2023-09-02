const resError = (res, status, message) => {
    res.status(status).json({
        error: true,
        message: message
    })
}
export default resError