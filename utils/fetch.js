const fetchBase = (resource, init) => {
  // proxy to skip cors error
  const corsUrl = 'https://cors-server-proxy.herokuapp.com/';
  // api base url
  const apiUrl = 'https://api.itbook.store/1.0';
  const baseUrl = corsUrl + apiUrl;

  return fetch(baseUrl + resource, init);
};

export default fetchBase;
