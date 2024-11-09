import { useState } from "react";
import { supabase } from "./supabaseClient";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(true); // Toggle between register and login

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      alert("Check your email for the confirmation link!");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      alert("Logged in successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      </form>
      {error && <p>{error}</p>}
      <p>
        {isRegistering ? "Already have an account?" : "Don’t have an account?"}{" "}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
}

export default Registration;
