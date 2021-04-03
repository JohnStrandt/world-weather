import React from "react";
import { useSelector } from 'react-redux';
import styled from "styled-components";

const Alerts = () => {
  const current = useSelector((state) => state.current);
  const alerts = current.alerts;
  return (
    <AlertPage>
      {alerts.map(alert => (
        <Alert>
        <h2>{alert.event}</h2>
        <p>{alert.description}</p>
        </Alert>
      ))}
    </AlertPage>
  );
};

const AlertPage = styled.div`
  z-index: 10;
  position: absolute;
  height: 85vh;
  width: 100%;
  top: 0;
  border-radius: 10px;
  background: rgba(10, 10, 10, 0.9);
  color: white;
  padding: 1em 0.5rem;
  text-align: left;
  overflow: scroll;
  h2{
    color: var(--color-accent);
  }
`;

const Alert = styled.div`
  margin: 1.5rem 0;
`;

export default Alerts;