const BASE = '/tasks';

async function handleResponse(res) {
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Something went wrong');
  }
  return json.data;
}

export const api = {
  getTasks: (status) => {
    const url = status ? `${BASE}?status=${status}` : BASE;
    return fetch(url).then(handleResponse);
  },

  createTask: (title, description) =>
    fetch(BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    }).then(handleResponse),

  updateTask: (id, fields) =>
    fetch(`${BASE}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    }).then(handleResponse),

  deleteTask: (id) =>
    fetch(`${BASE}/${id}`, { method: 'DELETE' }).then(async (res) => {
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Delete failed');
      return true;
    }),
};
