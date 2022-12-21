let dataState = {
    product: []
}

const rootReducer = (state = dataState, action) => {
    switch (action.type) {
      case 'UPDATE_ALL_PRODUCT':
          return {
              ...state,
              product: action.data
          }
      case 'ADD_PRODUCT':
          return {
              ...state,
              product: [...state.product, action.data]
          }
      case 'UPDATE_PRODUCT':
          return {
              ...state,
              product: state.product.map(obj =>
                  obj.id === action.data.id ?
                      { ...obj }
                      : obj)
          }
      case 'DELETE_PRODUCT':
          return {
              ...state,
              product: state.product.filter(obj => obj.id !== action.data.id)
          }
        default:
            return state;

    }
}

export default rootReducer;


