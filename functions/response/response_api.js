module.exports.format = (data, req, status) => {
    let url = req.originalUrl;
    return {
        meta: {

            "code": status.code ? status.code : 500,
            "message": status.message ? status.message : "Default message"
        },
        data: {
            ...data
        },
        pagination: {
            "url": url,
        }
    }
}