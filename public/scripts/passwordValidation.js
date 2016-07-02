function validate() {
  var password = document.getElementById('password').value;
  if (password === 'password') {
    alert('Password is a dangerous password, please enter another.');
  } else {
    window.location('submit');
  }
}
