import React, {useEffect, useState} from "react";
import tmdb, {getApiKey as storageGetApiKey, setApiKey as storageSetApiKey} from "../../services/tmdb";
import Layout from "../Layout/Layout";

export default function App() {
    const [apiKey, setApiKey] = useState('');
    const [configuration, setConfiguration] = useState(null);

    useEffect(() => setApiKey(storageGetApiKey()), [apiKey]); // retrieve the API key from local storage

    useEffect(() => {
        tmdb()
            .configuration()
            .then(data => setConfiguration(data));
    }, [apiKey]); // retrieve the configuration every time the api_key is changed

    const handleApiKeyChanged = (key) => {
        storageSetApiKey(key || null);
        setApiKey(key); // explicitly set the api key in the state to force a rerender
    };

    return (
        <Layout
            apiKey={apiKey}
            handleApiKeyChanged={handleApiKeyChanged}
            configuration={configuration || {}}
        />
    );
}
