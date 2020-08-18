export default async (url, { method, token, contentType } = {}, data) => {
  const res = await fetch(`${process.env.REACT_APP_API}api/${url}`, {
    method: method || 'GET',
    headers: {
      'Content-Type': contentType || 'application/json',
      Authorization: `Beared ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
