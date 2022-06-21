import axios from "axios";

export const GET_RECIPE = "GET_RECIPE";
export const FILTER_DIETS = "FILTER_DIETS";

export function getRecipe() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/recipe");
    return dispatch({
      type: GET_RECIPE,
      payload: json.data,
    });
  };
}

export function filterRecipeByDiets(payload) {
  return {
    type: FILTER_DIETS,
    payload,
  };
}
