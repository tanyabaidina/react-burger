export const actionCreator = (type) => {
    return {
        type: type,
    }
}

export const actionPayloadCreator = (type, payload) => {
    return {
        type: type,
        payload: payload
    }
}

export const actionErrorCreator = (type, error) => {
    return {
        type: type,
        error: error
    }
}