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
        <footer>
          <h3>tap anywhere to exit</h3>
        </footer>
      </AlertPage>
    );
  }
  return alertScreen;
};

const AlertPage = styled.div`
  position: fixed;// key to cover screen
  display: flex;
  flex-direction: column;
  z-index: 10;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  color: white;
  text-align: left;
  background: rgba(10, 10, 10, 0.9);
  footer {
    background: rgba(10, 10, 10, 1);
    text-align: center;
    bottom: 0;
    position: sticky;
    position: -webkit-sticky; /* Safari */
  }
  h2 {
    color: var(--color-accent);
    font-weight: 300;
  }
  h3 {
    font-size: 1.4em;
    font-weight: 100;
    line-height: 2em;
  }
`;

const Alert = styled.div`
  flex: 1 0 auto; 
  // flex: grow shrink basis -> keep footer on bottom
  padding: 2em 1em;
`;

export default Alerts;
