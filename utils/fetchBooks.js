const fetchBooks = async (resource) => {
  const apiUrl = 'https://api.itbook.store/1.0';

  const res = await fetch(`${apiUrl}${resource}`, {
    headers: {
      origin: '*',
      'Content-Type': 'application/json',
    },
  });
  const json = await res.json();

  return json;
};

export default fetchBooks;
