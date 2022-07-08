import axios from "axios";

export function getDiet() {
  return async function (dispatch) {
    axios.get("/diet").then((json) => {
      return dispatch({
        type: "GET_DIET",
        payload: json.data,
      });
    });
  };
}

export function getRecipe() {
  return async function (dispatch) {
    let json = await axios.get("/recipe");
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
      let json = await axios.get("/recipe?name=" + name);
      return dispatch({
        type: "GET_NAME_RECIPE",
        payload: json.data,
      });
    } catch (error) {
      alert("Not exist this recipe");
      console.log(error);
    }
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    let json2 = await axios.post("/recipes", payload);
    return json2;
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`/recipe/${id}`);
      console.log(json);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function cleanDetail() {
  return {
    type: "CLEAN_DETAIL",
    payload: [],
  };
}

export function cleanAllrecipe() {
  return {
    type: "CLEAN_ALL_RECIPE",
    payload: [],
  };
}
