import React, { useState } from "react";
// Styling
import styled from "styled-components";
// Redux
import { getWeather } from "../actions/weatherAction";
import { useSelector, useDispatch } from "react-redux";

const Nav = () => {
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState("");

  const inputHandler = (e) => {
    setTextInput(e.target.value);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(getWeather(textInput));
    document.getElementById("searchField").blur();
    // blur - dismiss keyboard on mobile if user hits enter instead of submit
    setTextInput("");
  };

  const error = useSelector((state) => state.error);

  return (
    <Search>
      <StyledForm>
        <input
          id="searchField"
          onChange={inputHandler}
          value={textInput}
          type="text"
          placeholder="Search another location..."
        />
        <button type="submit" onClick={submitSearch}>
          GO!
        </button>
      </StyledForm>
      {error && <Error>sorry, "{error.city}" not found</Error>}
    </Search>
  );
};

const Search = styled.div`
  height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (min-height: 700px) {
    padding-top: 5vh;
  }
`;

const Error = styled.p`
  position: absolute;
  padding-top: 5em;
  text-align: center;
  color: var(--color-accent);
  font-weight: 500;
  font-size: 0.8rem;

`;

const StyledForm = styled.form`
  display: flex;
  button {
    background: transparent;
    border: solid 1px white;
    border-radius: 5px;
    padding: .4em 1em;
    color: white;
    margin-left: 0.5rem;
  }
  button:hover {
    cursor: pointer;
  }
  button:focus {
    outline: none;
  }

  input {
    border-radius: 5px;
    border: none;
    outline: none;
    width: 24ch;
    padding: 0.4rem;
  }
`;

export default Nav;
