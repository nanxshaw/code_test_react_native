import axios from 'axios';

const ApiGet = async (http) => {
    let options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const request = await axios.get(http, options)
        .then(response => response)
        .catch(error => error.response.data);
    return request;
};

const ApiPost = async (http, payload) => {
    let options = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };
    const req = await axios.post(http, payload, options)
        .then(response => response)
        .catch(error => error.response.data);
    return req;
};
export const ApiPut = (http, payload, token) => {
    let options = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    };
    return axios.put(http, payload, options)
        .then(response => response)
        .catch(error => error.response.data);
};


export const ApiDelete = (http, payload, token) => {
    let options = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    };
    return axios.delete(http, { params: payload, headers: options })
        .then(response => response)
        .catch(error => error.response.data);
};

export default {
    ApiGet,
    ApiPost,
    ApiPut,
    ApiDelete
}