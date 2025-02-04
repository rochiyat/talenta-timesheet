import axios from 'axios';

const httpUtil = {
  baseConfig: {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 60000,
    withCredentials: false,
  },

  GET: async (baseURL: string, params = '', options = {}) => {
    const config = {
      baseURL,
      ...httpUtil.baseConfig,
      ...options,
      method: 'get',
      url: baseURL + params,
    };
    return axios(config);
  },

  POST: async (baseURL: string, params = '', payload = {}, options = {}) => {
    const config = {
      baseURL,
      ...httpUtil.baseConfig,
      ...options,
      method: 'post',
      url: baseURL + params,
      data: payload,
    };
    return axios(config);
  },
};

export default httpUtil;
