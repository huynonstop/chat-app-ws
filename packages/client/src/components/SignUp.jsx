import React from 'react';

export default ({
  onSubmit, formState: {
    username, password, confirmPassword, email,
  }, onChange,
}) => (
  <form className="form signUp-form" onSubmit={onSubmit}>
    <h1>Hello new comers :&gt;</h1>
    <label className="form-input" htmlFor="username">
      <span>Username</span>
      <input autoComplete="off" type="name" id="username" value={username} onChange={onChange} />
    </label>
    <label className="form-input" htmlFor="email">
      <span>Email</span>
      <input autoComplete="off" type="email" id="email" value={email} onChange={onChange} />
    </label>
    <label className="form-input" htmlFor="confirmPassword">
      <span>Password</span>
      <input autoComplete="off" type="password" id="confirmPassword" value={confirmPassword} onChange={onChange} />
    </label>
    <label className="form-input" htmlFor="password">
      <span>Confirm Password</span>
      <input autoComplete="off" type="password" id="password" value={password} onChange={onChange} />
    </label>
    <div className="d-flex w-100 justify-content-evenly mt-3">
      <button className="btn btn-main" type="submit">Register</button>
    </div>
  </form>
);
