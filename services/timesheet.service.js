const axios = require('axios');

const url = process.env.URL_TALENTA;

export async function lastTimesheet(cookie) {
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}
