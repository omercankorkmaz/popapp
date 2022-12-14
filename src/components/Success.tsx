import React, { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import check from "../assets/icons/check.png";

const Success = () => {

  const { settingsState } = useContext(SettingsContext);

  return (
    <>
        <img src={check} /> 
        <h1 className="success-message">{settingsState.successMessage}</h1>
    </>
  );
}

export default Success;
