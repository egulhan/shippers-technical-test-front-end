/**
 * Parse unprocessable entity error payload
 *
 * @param payload
 * @returns {*[]}
 */
export const parseUnprocessableEntityErrorPayload = (payload) => {
    const errors = Object.values(payload?.response?.data?.errors);

    if (!errors) {
        return [];
    }

    let parsedErrors = [];

    errors.forEach(item => {
        parsedErrors = [...parsedErrors, ...item];
    });

    return parsedErrors;
};

/**
 * Handle HTTP error
 *
 * @param error
 * @returns {string[]|*[]}
 */
export const handleHttpError = (error) => {
    if (error.response.status === 422) {
        return parseUnprocessableEntityErrorPayload(error);
    } else {
        const message = error?.response?.data?.message || 'Unknown server error!';
        return [message];
    }
};