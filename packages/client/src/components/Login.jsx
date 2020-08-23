import React from 'react';
import { Link } from '@reach/router';

export default ({
  onSubmit,
  formState: { username, password } = {},
  onChange,
}) => (
  <form className="form login-form" onSubmit={onSubmit}>
    <h1>RamChat</h1>
    <label className="form-input" htmlFor="username">
      <input
        required
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={onChange}
        pattern="^[\w\d_]{6,}$"
        title="Minimum 6 characters. Only letters, numbers and underscores is allowed"
      />
      <span>Username</span>
    </label>
    <label className="form-input" htmlFor="password">
      <span>Password</span>
      <input
        required
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={onChange}
        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
        title="Minimum eight characters, at least one letter and one number"
      />
    </label>
    <div className="d-flex w-100 justify-content-evenly mt-3">
      <button className="btn btn-main bg-sidebar" type="submit">
        Login
      </button>
      <Link className="btn btn-sub" to="/signup">
        JoinUs
      </Link>
    </div>
  </form>
);
