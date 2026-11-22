import { useState } from "react";

export default function Login() {
  const [showSignup, setShowSignup] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <>
      {!showSignup ? (
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

            <p><button type="submit">Log In</button></p>
          </form>

          <p>
            Don't have an account?{" "}
            <a
              href="#signup"
              onClick={(event) => {
                event.preventDefault();
                setShowSignup(true);
              }}
            >
              Sign up!
            </a>
          </p>
        </section>
      ) : (
        <section id="signup">
          <h1>Sign Up</h1>

          <form onSubmit={handleSubmit}>
            <p>
              <label htmlFor="signup-username">Username</label>
              <br />
              <input type="text" id="signup-username" name="new-username" required />
            </p>

            <p>
              <label htmlFor="signup-password">Password</label>
              <br />
              <input type="password" id="signup-password" name="new-password" required />
            </p>

            <p><button type="submit">Sign Up</button></p>
          </form>

          <p>
            <a
              href="#login"
              onClick={(event) => {
                event.preventDefault();
                setShowSignup(false);
              }}
            >
              Go Back to Log In
            </a>
          </p>
        </section>
      )}
    </>
  );
}
