import axios from 'axios';

const API_BASE   = 'https://witwt-api.herokuapp.com';
const API_PREFIX = 'api/v1';

const API_URL = `${API_BASE}/${API_PREFIX}`;
const RESOURCE = 'todos';

const BASE_PATH = `${API_URL}/${RESOURCE}`;
export class TodoService {
  list = {
    loading: false,
    init: false,
    error: null
  };
  single = {
    loading: false,
    init: false,
    error: null
  };

  /**
   * Fetch List from API
   * @returns {Promise.<T>|Promise<R>}
   */
  fetchList () {
    this.list.loading = true;

    return axios.get(BASE_PATH)
      .then((resp) => {
        this.list = {
          ...this.list,
          resources: resp.data,
          error: null,
          loading: false,
          init: true
        };
      })
      .catch((e) => {
        this.list = {
          ...this.list,
          loading: false,
          error: e
        };
      });
  }

  /**
   * Returns the current List State
   * @returns {{loading: boolean, init: boolean, error: null, items: Array}}
   */
  getList () {
    return this.list;
  }

  /**
   * Retuns the single item State
   * @returns {{loading: boolean, init: boolean, error: null, items: Array}}
   */
  getSingle () {
    return this.single;
  }
}

export default new TodoService();


