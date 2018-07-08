
  /* Get operation */
  get (url) {
    fetch(url)
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText)
      }
      res.json()
      .then(data => {
        return data;
      })
    })        
    .catch(err => console.log(err));
  }

  /* Post operation */
  post (input, url) {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
      res.json()
      .then(data => {
        return data;
      })
    })        
    .catch(err => console.log(err));
  }

  /* Update operation */
  put (input, url) {
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(input),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
      res.json()
      .then(data => {
        return data;
      })
    })        
    .catch(err => console.log(err));
  }

  /* Delete operation */
  del (input) {
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
      res.json()
      .then(data => {
        return data;
      })
    })        
    .catch(err => console.log(err));
  }

module.exports = {
  get,
  post,
  put,
  del
};
