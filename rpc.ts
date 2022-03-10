import axios from 'axios';

type JsonRpcType = {
  jsonrpc: '2.0';
  id: number | string;
  method: string;
  params: Array<string | string[] | object>;
};

export const _request = (url: string, body: JsonRpcType): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, body)
      .then(resp => {
        if (!resp.data.result || !!resp.data.error) reject(new Error(resp.data.error.message || resp.data.error));
        resolve(resp.data.result);
      })
      .catch(reject);
  });
};
