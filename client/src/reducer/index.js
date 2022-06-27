const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPE":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case "GET_DIET":
      return {
        ...state,
        diets: action.payload,
      };

    case "FILTER_BY_DIETS":
      const allRecipe = state.allRecipes;
      const statusFiltered =
        action.payload === "all"
          ? allRecipe
          : allRecipe.filter((e) =>
              e.diets.find((e) => e.includes(action.payload))
            );
      return {
        ...state,
        recipes: statusFiltered,
      };

    case "ORDER_BY_TITLE":
      let sortedArr =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.title > b.title) {
                return 1;
              }
              if (b.title > a.title) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.title > b.title) {
                return -1;
              }
              if (b.title > a.title) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: sortedArr,
      };

    case "ORDER_BY_SCOREHEALTHY":
      let healthyScore =
        action.payload === "morehealthy"
          ? state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (a.healthScore < b.healthScore) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (a.healthScore < b.healthScore) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: healthyScore,
      };

    case "GET_NAME_RECIPE":
      return {
        ...state,
        recipes: action.payload,
      };

    case "POST_RECIPE":
      return {
        ...state,
      };

    default:
      return state;
  }
}

export default rootReducer;
