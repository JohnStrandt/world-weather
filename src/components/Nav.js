import React, { useState } from "react";
// Styling
import styled from "styled-components";
// Redux
import { getWeather } from "../actions/weatherAction";
import { useDispatch } from "react-redux";

const Nav = () => {
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState("");

  const inputHandler = (e) => {
    e.preventDefault();
    setTextInput(e.target.value);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(getWeather(textInput));
    setTextInput("");
  };

  // const clearSearch = () => {
  //   dispatch({ type: "CLEAR_SEARCHED" });
  // };

  return (
    <StyledForm>
      <input
        onChange={inputHandler}
        value={textInput}
        type="text"
        placeholder="Search another location..."
      />
      <button type="submit" onClick={submitSearch}>
        GO!
      </button>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  justify-content: center;

  button {
    background: transparent;
    border: solid 1px white;
    border-radius: 5px;
    padding: 0 1rem;
    color: white;
    margin-left: 0.5rem;
  }
  button:hover {
    cursor: pointer;
  }
  input {
    border-radius: 5px;
    border: none;
    outline: none;
    width: 30%;
    min-width: 250px;
    padding: 0.4rem;
  }
  @media only screen and (max-width: 600px) {
    input {
      font-size: 1rem;
      width: 50%;
      min-width: 200px;
    }
    /* button {
      padding: 0 0.5rem;
    } */
  }
`;

export default Nav;
