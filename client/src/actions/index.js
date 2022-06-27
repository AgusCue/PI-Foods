import axios from "axios";

export function getDiet() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/diet");
    return dispatch({
      type: "GET_DIET",
      payload: json.data,
    });
  };
}

export function getRecipe() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/recipe");
    return dispatch({
      type: "GET_RECIPE",
      payload: json.data,
    });
  };
}

export function filterRecipeByDiets(payload) {
  return {
    type: "FILTER_BY_DIETS",
    payload,
  };
}

export function orderByScore(payload) {
  return {
    type: "ORDER_BY_SCOREHEALTHY",
    payload,
  };
}

export function orderByTitle(payload) {
  return {
    type: "ORDER_BY_TITLE",
    payload,
  };
}

export function getNameRecipe(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/recipe?name=" + name);
      return dispatch({
        type: "GET_NAME_RECIPE",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    let json2 = await axios.post("http://localhost:3001/recipe", payload);
    return json2;
  };
}
