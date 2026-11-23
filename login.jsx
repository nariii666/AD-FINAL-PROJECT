export default function Login({ onRegister, onLogin }) {
  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    onLogin(form.get("username").trim() || "seller");
  }

  return (
    <section id="login">
      <h1>Log In</h1>

      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="login-username">Username</label>
          <br />
          <input type="text" id="login-username" name="username" required />
        </p>

        <p>
          <label htmlFor="login-password">Password</label>
          <br />
          <input type="password" id="login-password" name="password" required />
        </p>

        <p>
          <button type="submit">Log In</button>
        </p>
      </form>

      <p>
        Don't have an account?{" "}
        <a
          href="#signup"
          onClick={(event) => {
            event.preventDefault();
            onRegister();
          }}
        >
          Sign up!
        </a>
      </p>
    </section>
  );
}
