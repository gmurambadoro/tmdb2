import React, {useEffect, useState} from "react";
import tmdb, {getApiKey as storageGetApiKey, setApiKey as storageSetApiKey} from "../../services/tmdb";
import Layout from "../Layout/Layout";

export default function App() {
    const [apiKeyState, setApiKeyState] = useState('');
    const [configuration, setConfiguration] = useState(null);

    useEffect(() => {
        const key = storageGetApiKey();

        setApiKeyState(key);
    }, [apiKeyState]); // retrieve the API key from local storage

    useEffect(() => {
        tmdb()
            .configuration()
            .then(data => setConfiguration(data));
    }, [apiKeyState]); // retrieve the configuration every time the api_key is changed

    const handleApiKeyChanged = (key) => {
        storageSetApiKey(key || null);
        setApiKeyState(key || null);
    };

    return (
        <Layout
            apiKey={apiKeyState}
            handleApiKeyChanged={handleApiKeyChanged}
            configuration={configuration || {}}
        />
    );
}
