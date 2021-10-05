import axios from 'axios';
import { limit } from './constants';
const { REACT_APP_API_URL } = process.env;

export const getData = async (status, offset) => {
    try {
        const { data } = await axios.get(`${REACT_APP_API_URL}/${status}?limit=${limit}&offset=${offset}`);
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
export const getJobInfo = async (queue, id) => {
    try {
        const { data } = await axios.get(`${REACT_APP_API_URL}/job/${queue}/${id}`);
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const deleteJobById = async (queue, id) => {
    try {
        const { data } = await axios.delete(`${REACT_APP_API_URL}/job/${queue}/${id}`);
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const retryJob = async (queue, id) => {
    try {
        const { data } = await axios.put(`${REACT_APP_API_URL}/job/${queue}/${id}`);
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
