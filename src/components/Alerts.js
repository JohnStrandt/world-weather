import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const Alerts = () => {
  const alerts = useSelector((state) => state.alerts);
  const showAlerts = useSelector((state) => state.showAlerts);
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch({
      type: "TOGGLE_SHOW_ALERTS",
    });
  };

  let alertScreen = null;

  if (alerts && showAlerts) {
    alertScreen = (
      <AlertPage onClick={clickHandler}>
        {alerts.map((alert) => (
          <Alert key={alert.event}>
            <h2>{alert.event}</h2>
            <p>{alert.description}</p>
          </Alert>
        ))}

        <footer className="foot-note"><h3>tap anywhere to exit</h3></footer>
      </AlertPage>
    );
  }
  return alertScreen;
};

const AlertPage = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 10;
  position: absolute;
  height: 100%;
  width: 100%;
  color: white;
  text-align: left;
  background: rgba(10, 10, 10, 0.9);
  padding: 1em 0.5rem 0 0.5rem;
  overflow: scroll;
  h2 {
    color: var(--color-accent);
    font-weight: 300;
  }
  .foot-note {
    background: rgba(10, 10, 10, 1);
    text-align: center;
    position: -webkit-sticky; /* Safari */
    position: sticky;
    bottom: 0;
  }
  h3 {
    font-size: 1.4em;
    font-weight: 100;
    line-height: 2em;
  }
`;

const Alert = styled.div`
  flex: 1 0 auto; // flex: grow shrink basis -> keep footer on bottom
  margin: 1.5rem 0;
`;

export default Alerts;
