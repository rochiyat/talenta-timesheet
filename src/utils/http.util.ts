import axios from 'axios';

const httpUtil = {
  baseConfig: {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 60000,
    withCredentials: false,
  },

  GET: async (baseURL: string, endpoint: string, params = '', options = {}) => {
    const config = {
      baseURL,
      ...httpUtil.baseConfig,
      ...options,
      method: 'get',
      url: baseURL + params,
    };
    return axios(config);
  },
};

export default httpUtil;
