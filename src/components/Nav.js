import React, { useState } from "react";
// Styling
import styled from "styled-components";
// Redux
import { getWeather } from "../actions/weatherAction";
import { useDispatch } from "react-redux";
// Logo
import globe from "../images/globe.png";

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

  const clearSearch = () => {
    dispatch({ type: "CLEAR_SEARCHED" });
  };

  return (
    <StyledNav>
      <Logo onClick={clearSearch}>
        <h1>World</h1>
        <img src={globe} alt="logo" />
        <h1>Weather</h1>
      </Logo>
      <form className="search">
        <input
          onChange={inputHandler}
          value={textInput}
          type="text"
          placeholder="Search city..."
        />
        <button onClick={submitSearch} type="submit">
          Search
        </button>
      </form>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  margin: 2rem auto;
  text-align: center;
  @media only screen and (max-width: 600px) {
    margin: 0 auto;
  }
  form {
    @media only screen and (max-width: 600px) {
      button {
        font-size: 1rem;
        padding: 0.5rem;
      }
      input {
        font-size: 1rem;
        width: 50%;
        min-width: 150px;
      }
    }
  }

  input {
    width: 30%;
    min-width: 250px;
    font-size: 1.5rem;
    padding: 0.4rem;
    margin-top: 1rem;
    outline: none;
    border: 2px solid var(--color-primary);
  }

  button {
    font-size: 1.5rem;
    padding: 0.5rem 2rem;
    border: none;
    outline: none;
    background: var(--color-primary);
    color: white;
    cursor: pointer;
  }
`;

const Logo = styled.div`
  font-family: "Gochi Hand", cursive;
  display: flex;
  justify-content: center;
  padding: 1rem;
  cursor: pointer;

  h1 {
    color: var(--color-primary);
    font-size: 3rem;
    align-self: flex-end;
  }
  img {
    height: 6rem;
    width: 6rem;
  }

  @media only screen and (max-width: 600px) {
    padding: .5rem 0 0 0;
    h1 {
      font-size: 2rem;
    }
    img {
      width: 3.5rem;
      height: 3.5rem;
    }
  }
`;

export default Nav;
