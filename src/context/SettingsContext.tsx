import React, { createContext, ReactNode, useReducer } from "react";

type SettingsType = {
    headline?: string, 
    description?: string, 
    successMessage?: string,
}

export const SettingsContext = createContext({
    settingsState: {
        headline: '', 
        description: '', 
        successMessage: '',
    },
    settingsDispatch: ({ type, payload }: { type: string, payload: SettingsType }) => {}
});

type PropType = {
    children: ReactNode,
}

export const SettingsProvider = (props: PropType) => {

    const initialSettings = {
        headline: 'NEW STUFF', 
        description: 'Sign up for our newsletter and get 15% off your first order!', 
        successMessage: 'Success',
    };
    
    const settingsReducer = (
        prevState: any,
        action: { type: string, payload: SettingsType },
    ) => {
        switch (action.type) {
            case 'SET':
                return {
                    ...prevState,
                    ...action.payload,
                };
        }
    };

    const [settingsState, settingsDispatch] = useReducer(settingsReducer, initialSettings);

    return (
        <SettingsContext.Provider 
            value={{ settingsState, settingsDispatch }}
        >{props.children}
        </SettingsContext.Provider>
    )
}