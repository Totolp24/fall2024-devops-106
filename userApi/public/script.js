document.getElementById('createUserForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('createUserId').value;
    const name = document.getElementById('createUserName').value;
  
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, name })
    })
    .then(response => response.text())
    .then(data => alert('User created: ' + data))
    .catch(error => console.error('Error:', error));
  });
  
  document.getElementById('getUserForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('getUserId').value;
  
    fetch('/users/' + id)
    .then(response => response.text())
    .then(data => document.getElementById('getUserResult').innerText = 'User: ' + data)
    .catch(error => console.error('Error:', error));
  });
  
  document.getElementById('updateUserForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('updateUserId').value;
    const name = document.getElementById('updateUserName').value;
  
    fetch('/users/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    })
    .then(response => response.text())
    .then(data => alert('User updated: ' + data))
    .catch(error => console.error('Error:', error));
  });
  
  document.getElementById('deleteUserForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('deleteUserId').value;
  
    fetch('/users/' + id, {
      method: 'DELETE'
    })
    .then(response => response.text())
    .then(data => alert('User deleted: ' + data))
    .catch(error => console.error('Error:', error));
  });