const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  errorMessage
}) => {
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={handleUsernameChange}
            />
        </div>
        <div>
          Password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={handlePasswordChange}
            />
        </div>
        <button type="submit">Login</button>
        <div>{errorMessage}</div>
      </form>
    </div>
  )
}

export default LoginForm