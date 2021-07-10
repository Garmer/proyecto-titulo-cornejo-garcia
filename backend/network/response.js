const statusMessages = {
    '200': 'Done',
    '201': 'Created',
    '400': 'Invalid format',
    '500': 'Internal error',
    '401': 'Unauthorized',
    '403': 'Forbidden',
    '409': 'Conflict',
    '415': 'Unsupported Media Type',
    '413': 'Payload Too Large'
}

exports.success = function (req, res, message, status) {
    let statusCode = status;
    let statusMessage = message;
    
    if (!status) {
        status = 200;
    }

    if (!message) {
        statusMessage = statusMessages[status];
    }

    res.status(statusCode).send({ 
        success: true,
        error: null,
        data: statusMessage
    });
}

exports.error = function (req, res,status = null, message = null) {

    res.status(status || 500).send({ 
        success: false,
        error: statusMessages[status],
        data: null,
    });
}