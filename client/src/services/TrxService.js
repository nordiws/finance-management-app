import http from '../http-common';

const getTrxByMonthYear = (mthYr) => {
  return http.get(`/api/transaction?period=${mthYr}`);
};

const get = (id) => {
  return http.get(`/api/transaction/${id}`);
};

const create = (data) => {
  return http.post('/api/transaction', data);
};

const update = (id, data) => {
  return http.put(`/api/transaction/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/api/transaction/${id}`);
};

export default {
  getTrxByMonthYear,
  get,
  create,
  update,
  remove,
};
