import React from 'react';

export default ({
  onSubmit,
  formState: {
    username, password, confirmPassword, email,
  },
  onChange,
}) => (
  <form className="form signUp-form" onSubmit={onSubmit}>
    <h1>Hello new comers :&gt;</h1>
    <label className="form-input" htmlFor="username">
      <span>Username</span>
      <input
        autoComplete="off"
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={onChange}
        required
        pattern="^[\w\d_]{6,}$"
        title="Minimum 6 characters. Only letters, numbers and underscores is allowed"
      />
    </label>
    <label className="form-input" htmlFor="email">
      <span>Email</span>
      <input
        autoComplete="off"
        name="email"
        type="email"
        id="email"
        value={email}
        onChange={onChange}
        required
      />
    </label>
    <label className="form-input" htmlFor="password">
      <span>Password</span>
      <input
        autoComplete="off"
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={onChange}
        required
        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
        title="Minimum eight characters, at least one letter and one number"
      />
    </label>
    <label className="form-input" htmlFor="confirmPassword">
      <span>Confirm Password</span>
      <input
        autoComplete="off"
        name="confirmPassword"
        type="password"
        id="confirmPassword"
        pattern={password}
        title="Confirm password must match"
        required
      />
    </label>
    <div className="d-flex w-100 justify-content-evenly mt-3">
      <button className="btn btn-main" type="submit">
        Register
      </button>
    </div>
  </form>
);
