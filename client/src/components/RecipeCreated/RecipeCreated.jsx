import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipe, getDiet } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import img from "../../imagen/homes.png";

import "./RecipeCreated.css";

const validateName = /^[a-z]+$/i;
const validateNum = /^((100(\.0{1,2})?)|(\d{1,2}(\.\d{1,2})?))$/;
const validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;

function validate(input) {
  let errors = {};

  if (!input.title || input.title.length < 3) {
    errors.name = "Requires a title";
  } else if (!validateName.test(input.title)) {
    errors.name = "Not accept numbers";
  } else if (!input.summary) {
    errors.summary = "Requires a summary";
  } else if (input.summary.length < 20) {
    errors.summary = "Min of letters 20";
  } else if (input.healthScore < 0 || input.healthScore > 100) {
    errors.healthScore = "the value must be between 1-100";
  } else if (!validateNum.test(input.healthScore)) {
    errors.healthScore = "It has to be a number";
  } else if (input.spoonacularScore < 0 || input.spoonacularScore > 100) {
    errors.spoonacularScore = "the value must be between 1-100";
  } else if (!validateNum.test(input.spoonacularScore)) {
    errors.spoonacularScore = "It has to be a number";
  } else if (!validateUrl.test(input.image)) {
    errors.image = "the image is missing";
  }
  return errors;
}

// function validatePaso(input){
//   let errorsPaso = {}

//   if(!indexPaso[i]){
//     errorsPaso.indexPaso = 'te falta este paso'
//   }
// }

export default function RecipeCreated() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);
  const [cantP, setCantP] = useState(1);
  const [indexPaso, setIndexPaso] = useState({});
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    title: "",
    summary: "",
    steps: [],
    healthScore: "",
    spoonacularScore: "",
    image: "",
    diets: [],
  });

  //-----------Steps--------------//
  function handleChangePaso(e, i) {
    let paso2 = [];
    setIndexPaso({
      ...indexPaso,
      [i]: e.target.value,
    });
    for (let i = 0; i < cantP - 1; i++) {
      paso2.push(indexPaso[i]);
    }
    setInput({
      ...input,
      steps: paso2,
    });
  }

  function addInputPaso() {
    let paso = [];
    if (cantP <= 10) {
      setIndexPaso({
        ...indexPaso,
        [cantP]: "",
      });
      for (let i = 0; i < cantP; i++) {
        paso.push(indexPaso[i]);
      }
      setCantP(1 + cantP);
      setInput({
        ...input,
        steps: paso,
      });
    }
  }

  //-----------Datos--------------//
  function handleChange(e) {
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  //-----------Formulario--------------//
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postRecipe(input));
    if (!input.title) return alert("completa los campos");
    if (
      errors.name ||
      errors.summary ||
      errors.image ||
      errors.spoonacularScore ||
      errors.healthScore
    ) {
      alert("Missing fill spaces");
    } else {
      alert("Created recipe!");
      setInput({
        title: "",
        summary: "",
        steps: [],
        healthScore: "",
        spoonacularScore: "",
        image: "",
        diets: [],
      });
      history.push("/home");
    }
  }

  //-----------CheckBox--------------//
  function handleCheckBox(e) {
    const clicked = diets
      .filter((d) => e.target.value === d.title)
      .map((d) => d.title);
    if (e.target.checked) {
      setInput({
        ...input,
        diets: [...input.diets, ...clicked],
      });
    } else {
      setInput({
        ...input,
        diets: input.diets.filter((e) => e !== clicked[0]),
      });
    }
  }

  useEffect(() => {
    dispatch(getDiet());
  }, [dispatch]);

  return (
    <div className="colum">
      <div className="colum-home">
        <Link to="/home">
          <img src={img} alt="img" width="100px" height="100px" />
        </Link>
      </div>
      <h1>Created your recipe</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="inputs">
          <div className="inputs-left">
            <input
              placeholder="Title"
              onChange={handleChange}
              type="text"
              value={input.title}
              name="title"
              autocomplete="off"
            />
            <p>{errors.name}</p>
            <input
              placeholder="Summary"
              onChange={handleChange}
              type="text"
              value={input.summary}
              name="summary"
              autocomplete="off"
            />
            <p>{errors.summary}</p>
            <input
              placeholder="Health Score"
              onChange={handleChange}
              type="text"
              value={input.healthScore}
              name="healthScore"
              autocomplete="off"
            />
            <p>{errors.healthScore}</p>
            <input
              placeholder="Spoonacular Score"
              onChange={handleChange}
              type="text"
              value={input.spoonacularScore}
              name="spoonacularScore"
              defaultValue="50"
              autocomplete="off"
            />
            <p>{errors.spoonacularScore}</p>
            <input
              placeholder="Image"
              onChange={handleChange}
              type="text"
              value={input.image}
              name="image"
              autocomplete="off"
            />
            <p>{errors.image}</p>
            <div className="creardietas">
              <label style={{ textDecoration: "underline" }}>
                <strong>TIPES OF DIETS</strong>
              </label>
              <div className="check">
                {diets.map((e) => (
                  <div className="check-sub">
                    <input
                      type="checkbox"
                      value={e.title}
                      name={e.title}
                      onChange={(e) => handleCheckBox(e)}
                    />
                    <h5>{e.title}</h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="inputs-rigth">
            <button
              className="bn3637 bn36"
              onClick={() => {
                addInputPaso();
              }}
            >
              ADD STEP
            </button>
            {indexPaso &&
              input.steps.map((p, i) => {
                return (
                  <input
                    type="text"
                    value={indexPaso[i]}
                    name="steps"
                    onChange={(e) => handleChangePaso(e, i)}
                    required
                    autocomplete="off"
                  />
                );
              })}
          </div>
        </div>
        <button className="bn3637 bn37" type="submit">
          CREATED RECIPE
        </button>
      </form>
    </div>
  );
}
