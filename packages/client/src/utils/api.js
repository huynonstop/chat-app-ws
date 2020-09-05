export default async (url, {
  method, token, contentType, data, api = true,
} = {}) => {
  const res = await fetch(`${process.env.REACT_APP_API}${api ? 'api/' : ''}${url}`, {
    method: method || 'GET',
    headers: {
      'Content-Type': contentType || 'application/json',
      Authorization: `Beared ${token}`,
    },
    body: JSON.stringify(data),
  });
  const _data = await res.json();
  if (res.status >= 400 && res.status < 600) {
    throw new Error(_data.error);
  }
  return _data;
};
