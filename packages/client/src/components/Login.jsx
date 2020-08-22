import React from 'react';
import { Link } from '@reach/router';

export default ({ onSubmit, formState: { username, password }, onChange }) => (
  <form className="form login-form" onSubmit={onSubmit}>
    <h1>RamChat</h1>
    <label className="form-input" htmlFor="username">
      <span>Username</span>
      <input type="name" id="username" value={username} onChange={onChange} />
    </label>
    <label className="form-input" htmlFor="password">
      <span>Password</span>
      <input type="password" id="password" value={password} onChange={onChange} />
    </label>
    <div className="d-flex w-100 justify-content-evenly mt-3">
      <button className="btn btn-main " type="submit">Login</button>
      <Link className="btn btn-sub" to="/signup">JoinUs</Link>
    </div>
  </form>
);
