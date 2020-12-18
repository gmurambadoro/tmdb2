import axios from "axios";

const STORAGE_API_KEY_NAME = 'api.themoviedb.org.api_key';

const setApiKey = key => {
    localStorage.setItem(STORAGE_API_KEY_NAME, String(key || '').toString().trim());
};

const getApiKey = () => {
    const key = localStorage.getItem(STORAGE_API_KEY_NAME);

    return String(key).toString().trim();
}

const tmdb = () => {
    const https = axios.create({
        baseURL: 'https://api.themoviedb.org/3',
    });

    const get = async (url, params = {}) => {
        return https.get(url, {
            params: {
                ...params,
                api_key: getApiKey(),
            },
        });
    };

    return {
        configuration: async () => {
            try {
                const configuration = await get('/configuration')
                    .then(data => data.data);

                const { base_url, secure_base_url, poster_sizes  } = configuration.images;

                const [, w780] = poster_sizes;

                console.log(configuration);

                return {
                    base_url: `${base_url}${w780}`,
                    secure_base_url: `${secure_base_url}${w780}`,
                    api_key: getApiKey(),
                };
            } catch (e) {
                console.error(e);
            }

            return {
                base_url: '',
                secure_base_url: '',
                api_key: '',
            };
        },
        get: async (url, params = {}) => get(url, params || {}),
    };
};

export { setApiKey, getApiKey };

export default tmdb;