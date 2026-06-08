

const LoginForm = ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange }) => {

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            data-testid="username"
            value={username}
            name="Username"
            autoComplete="username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            data-testid="password"
            value={password}
            name="Password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;