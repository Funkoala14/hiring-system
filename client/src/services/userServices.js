import { get } from './api';

export const getUser = async () => {
    const response = await get('/user');
    const { data, code, message } = response;
    return data;
};
