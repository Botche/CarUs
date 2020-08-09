const BASE_URL = process.env.REACT_APP_CARUS_DATABASE_URL; 

async function fetchRequest(endpoint, headers) {
    const url = `${BASE_URL}/${endpoint}`;

    try {
        const response = await fetch(url, headers);
        const data = await handleError(response);
        return serializeData(data);
    }
    catch (error) {
        return console.error(`Error - ${error.message}`);
    }
}

function handleError(response) {
    if (!response.ok) {
        throw new Error('Something went wrong');
    }

    return response;
}

function serializeData(data) {
    return data.json();
}

function makeHeaders(method, data) {
    const headers = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (method === 'POST' || method === 'PATCH') {
        headers.body = JSON.stringify(data);
    }

    return headers;
}

async function getItem(endpoint) {
    const headers = makeHeaders('GET');

    return await fetchRequest(endpoint, headers);
}

async function createItem(endpoint, data) {
    const headers = makeHeaders('POST', data);

    return await fetchRequest(endpoint, headers);
}

async function updateItem(endpoint, data) {
    const headers = makeHeaders('PATCH', data);

    return await fetchRequest(endpoint, headers, data);
}

async function deleteItem(endpoint) {
    const headers = makeHeaders('DELETE');

    return await fetchRequest(endpoint, headers);
}

export default {
    getItem,
    createItem,
    updateItem,
    deleteItem,
}