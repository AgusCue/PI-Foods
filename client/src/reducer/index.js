import { GET_RECIPE, FILTER_DIETS } from "../actions";

const initialState = {
  recipes: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPE:
      return {
        ...state,
        recipes: action.payload,
      };
    case FILTER_DIETS:
      const allRecipes = state.recipes;
      const dietsFilter =
        action.payload === "all"
          ? allRecipes
          : allRecipes.filter((a) => a.diets === action.payload);
      return {
        ...state,
        recipes: dietsFilter,
      };
    default:
      return state;
  }
}

export default rootReducer;
