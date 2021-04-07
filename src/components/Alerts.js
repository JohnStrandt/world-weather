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
      </AlertPage>
    );
  }
  return alertScreen;
};

const AlertPage = styled.div`
  z-index: 10;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  background: rgba(10, 10, 10, 0.9);
  color: white;
  padding: 1em 0.5rem;
  text-align: left;
  overflow: scroll;
  h2 {
    color: var(--color-accent);
  }
`;

const Alert = styled.div`
  margin: 1.5rem 0;
`;

export default Alerts;
