export const helpHttp = () => {
  const customFetch = (endpoint, opcions) => {
    const defaultHeader = {
      accept: "application/json",
    };

    const controller = new AbortController();
    opcions.signal = controller.signal;

    opcions.method = opcions.method || "GET";
    opcions.headers = opcions.headers
      ? { ...defaultHeader, ...opcions.headers }
      : defaultHeader;

    opcions.body = JSON.stringify(opcions.body) || false;
    if (!opcions.body) delete opcions.body;

    // console.log(opcions);
    setTimeout(() => controller.abort(), 5000);

    return fetch(endpoint, opcions)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrio un error",
            })
      )
      .catch((err) => err);
  };
  const get = (url, options = {}) => customFetch(url, options);

  const post = (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };

  const put = (url, options = {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  };

  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
