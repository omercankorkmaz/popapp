import React, { useContext, useState } from 'react';
import { SettingsContext } from '../context/SettingsContext';

const Settings = () => {

    const { settingsState, settingsDispatch } = useContext(SettingsContext);

    return (
        <div className="setting-side">
            <h4 className="setting-side-header">General Settings</h4>
            <label>Headline</label>
            <input
                type="text"
                id="headline"
                name="headline"
                onChange={(e) => settingsDispatch({ type: 'SET', payload: { headline: e.target.value } })}
                value={settingsState.headline}
            ></input>
            <label>Description</label>
            <textarea
                id="description"
                name="description"
                onChange={(e) => settingsDispatch({ type: 'SET', payload: { description: e.target.value } })}
                value={settingsState.description}
            ></textarea>
            <label>Success Message</label>
            <input
                type="text"
                id="successMessage"
                name="successMessage"
                onChange={(e) => settingsDispatch({ type: 'SET', payload: { successMessage: e.target.value } })}
                value={settingsState.successMessage}
            ></input>
        </div>
    );
}

export default Settings;
