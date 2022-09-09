import React, { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';

const Success = () => {

  const { settingsState } = useContext(SettingsContext);

  return (
    <>
        <i className="fa fa-check success-icon"></i>
        <h1 className="success-message">{settingsState.successMessage}</h1>
    </>
  );
}

export default Success;
