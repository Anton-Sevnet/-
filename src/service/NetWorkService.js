class NetWorkService {
  #url;

  constructor(url) {
    this.#url = url;
  }

  retrieveFromPath(path) {
    return fetch(`${this.#url}/${path}`).then((response) => response.ok && response.json());
  }

  post() {

  }

  delete() {

  }

  put() {

  }
}

export default NetWorkService;