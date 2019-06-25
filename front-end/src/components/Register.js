import React from 'react';

class Register extends React.Component {


  render() {
    return(
      <form action="/register-confirm" method="post">
        <div>
          <label for="username" class="title">Username:</label>
          <input type="text" name="username"/>
        </div>
        <div>
          <label for="username" class="title">Password:</label>
          <input type="password" name="password"/>
        </div>
        <input type="submit"/>
      </form>
    )
  }
}

export default Register;
