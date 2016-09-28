import axios from 'axios';

const API_BASE   = 'https://witwt-api.herokuapp.com';
const API_PREFIX = 'api/v1';

const API_URL = `${API_BASE}/${API_PREFIX}`;
const RESOURCE = 'todos';

const BASE_PATH = `${API_URL}/${RESOURCE}`;
export class TodoService {
  STORE = {
    loading: false,
    hash: {},
    data: [],
    selected: {
      loading: false,
      data: {},
      init: false
    },
    init: false,
    error: null
  };

  /**
   * Fetch List from API
   * @returns {Promise.<T>|Promise<R>}
   */
  fetchList () {
    this.STORE.loading = true;

    return axios.get(BASE_PATH)
      .then((resp) => {
        const idHash = {};
        resp.data.forEach((item) => {
          idHash[ item.id ] = item;
        });
        this.STORE = {
          ...this.STORE,
          hash: idHash,
          error: null,
          loading: false,
          init: true
        };
      })
      .catch((e) => {
        this.STORE = {
          ...this.STORE,
          loading: false,
          error: e
        };
      });
  }

  /**
   * Will Update the hash id in the store
   * @param id
   * @returns {Promise<R2|R1>|Promise<R>|Promise.<TResult>|*}
   */
  fetchOne (id) {
    this.STORE.selected.loading = true;

    return axios.get(`${BASE_PATH}/${id}`)
      .then((resp) => {
        const { data } = resp;
        this.STORE.selected = {
          ...this.STORE.selected,
          loading: false,
          init: true,
          data: data
        };
        //  Update the hash
        this.STORE.hash[data.id] = data;
      });
  }

  create (data = {}) {
    this.STORE.selected.creating = true;

    return axios.post(`${BASE_PATH}`, data)
      .then((resp) => {
        const { data } = resp;
        this.STORE.selected = {
          ...this.STORE.selected,
          error: null,
          init: true,
          creating: false,
          data: data
        };

        //  Update the hash
        this.STORE.hash[data.id] = data;
      })
      .catch((e) => {
        this.STORE.selected = {
          ...this.STORE.selected,
          creating: false,
          error: e
        };
      });
  }
  /**
   * Save One Todo (Update)
   * @param data
   * @returns {Promise<R2|R1>|Promise<R>|Promise.<TResult>}
   */
  saveOne (data) {
    const { id } = data;
    if (id) {
      this.STORE.selected.updating = true;

      return axios.put(`${BASE_PATH}/${id}`, data)
        .then((resp) => {
          const { data } = resp;
          this.STORE.selected = {
            ...this.STORE.selected,
            error: null,
            updating: false,
            data: data
          };

          //  Update the hash
          this.STORE.hash[data.id] = data;
        })
        .catch((e) => {
          this.STORE.selected = {
            ...this.STORE.selected,
            updating: false,
            error: e
          };
        });
    }
  }
  /**
   * Selections the item from the hash
   * @param id
   */
  selectOne (id) {
    if (this.STORE.hash && this.STORE.hash[id]) {
      this.STORE.selected = {
        loading: false,
        error: null,
        data: this.STORE.hash[id]
      };
    }
  }

  /**
   * Returns the current List State
   * @returns {{loading: boolean, init: boolean, error: null, items: Array}}
   */
  getState () {
    return this.STORE;
  }

  /**
   * Returns friendls.STORE of the hashed data
   * @returns {Array}
   */
  getList () {
    return Object.keys(this.STORE.hash).map((id) => {
      return this.STORE.hash[id];
    });
  }

  /**
   * Retuns the single item State
   * @returns {{loading: boolean, init: boolean, error: null, items: Array}}
   */
  getSelected () {
    return this.STORE.selected;
  }

  /**
   * Clears selected data
   */
  clearSelected () {
    this.STORE.selected = {
      loading: false,
      updating: false,
      creating: false,
      init: false,
      error: null,
      data: {}
    };
  }
}

export default new TodoService();


//TODO: Look into a more immutable state
