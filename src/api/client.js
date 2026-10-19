const BASE_URL = prcess.env.VITE_API_URL 

async function request(endpoint, options = {})
{
    const url = `${BASE_URL}${endpoint}`
}


const headers = {
    'Content-Type:': 'applications/json',
    ...options.headers,
}

const config = {
    ...options,
    headers,
};

if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }