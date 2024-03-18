const initialState = {
  countries: {},
};

const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COUNTRY":
      // Check if action payload contains required data
      if (!action.payload || !action.payload.id || !action.payload.country) {
        // Return current state if data is incomplete
        return state;
      }
      // Action to add a new country to the state
      return {
        ...state,
        countries: {
          ...state.countries,
          [action.payload.id]: action.payload.country,
        },
      };
    case "DELETE_COUNTRY":
      // Action to delete a country from the state
      const newCountries = { ...state.countries };
      delete newCountries[action.payload];
      return {
        ...state,
        countries: newCountries,
      };
    default:
      return state;
  }
};

export default countriesReducer;
