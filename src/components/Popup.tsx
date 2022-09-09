import React, { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import Form from './Form';
import Success from './Success';


const Popup = () => {

    const [submitted, setSubmitted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const { settingsState } = useContext(SettingsContext);

    return (
        <div className="main-side">
            <div className="main-side-wrapper">
                <div className="main-side-popup">
                    {loading ?
                        <div>
                            LOADING...
                        </div> :
                        <>
                            <button className="close-button">
                                <i className="fa fa-times"></i>
                            </button>
        
                            {!submitted ? 
                            <>
                                <h1 className="headline">{settingsState.headline}</h1>
                                <div className="description">{settingsState.description}</div>
                                <Form 
                                    onSubmit={() => setSubmitted(true)} 
                                    onLoad={() => setLoading(false)} 
                                />
                            </> :
                            <Success />}
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Popup;
