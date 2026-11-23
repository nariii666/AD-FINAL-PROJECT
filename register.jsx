export default function Register({ onLogin, onRegister }) {
  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    onRegister(form.get("new-username").trim() || "seller");
  }

  return (
    <section id="signup">
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="signup-username">Username</label>
          <br />
          <input
            type="text"
            id="signup-username"
            name="new-username"
            required
          />
        </p>

        <p>
          <label htmlFor="signup-password">Password</label>
          <br />
          <input
            type="password"
            id="signup-password"
            name="new-password"
            required
          />
        </p>

        <p>
          <button type="submit">Sign Up</button>
        </p>
      </form>

      <p>
        <a
          href="#login"
          onClick={(event) => {
            event.preventDefault();
            onLogin();
          }}
        >
          Go Back to Log In
        </a>
      </p>
    </section>
  );
}
