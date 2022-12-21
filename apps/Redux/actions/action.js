
const UPDATE_ALL_PRODUCT = (data) => {
    return { type: 'UPDATE_ALL_PRODUCT', data: data }
}
const ADD_PRODUCT = (data) => {
    return { type: 'ADD_PRODUCT', data: data }
}
const UPDATE_PRODUCT = (data) => {
    return { type: 'UPDATE_PRODUCT', data: data }
}
const DELETE_PRODUCT = (data) => {
    return { type: 'DELETE_PRODUCT', data: data }
}
export { 
    UPDATE_ALL_PRODUCT, 
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
}