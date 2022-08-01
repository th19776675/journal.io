export const loginUser = (userData) => {
  return fetch('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const createUser = (userData) => {
  return fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
}

export const getDaily = (token) => {
  return fetch('/api/journal/daily', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    }
    });
}

export const getDailyPages = (token) => {
  return fetch('/api/journal/daily/pages', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    }
    });
}

export const postPlainDaily = (token, content, isPlain, isDaily, journalId) => {
  return fetch (`/api/journal/${journalId}/page`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content, isPlain, isDaily })
  });
}

export const updateUser = (token, userData) => {
  return fetch ("/api/user", {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData)
  })
}

export const getJournal = (token, journalId) => {
  return fetch (`/api/journal/${journalId}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
}

export const getPage = (token, pageId) => {
  return fetch (`/api/journal/page/${pageId}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
}

export const getJournalUser = (journalId) => {
  return fetch (`/api/user/journal/${journalId}`)
}

export const getCleanJournal = (token, journalId) => {
  return fetch (`/api/journal/clean/${journalId}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
}

export const getUser = (username) => {
  return fetch (`/api/user/username/${username}`)
}

export const getAllUsers = () => {
  return fetch (`/api/user`)
}

export const getAllJournals = () => {
  return fetch (`/api/journal`)
}

export const createJournal = (token, formData) => {
  return fetch ("/api/journal", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData)
  })
}

export const createPage = (token, content, isPlain, journalId) => {
  return fetch (`/api/journal/${journalId}/page`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content, isPlain })
  })
}

export const addFriend = (token, username) => {
  return fetch(`/api/user/add/${username}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
}

export const deleteJournal = (token , journalId) => {
  return fetch(`/api/journal/${journalId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
}

export const addPage = (token, journalId, pageId) => {
  return fetch(`/api/journal/page/${pageId}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ journalId })
  })
}