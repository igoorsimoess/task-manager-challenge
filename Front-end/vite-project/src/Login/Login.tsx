import React, { FC, useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom"; // Import useHistory for navigation

interface LoginProps {
  onSubmit: (username: string, password: string) => void;
}

const Login: FC<LoginProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.status === 202) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", token);
        
        // Redirect to TaskManager page on successful sign in
        navigate("/task_manager");
      } else if (response.status === 401) {
        setErrorMessage("This user is not registered");
      }
    } catch (error) {
      console.error("Error during authentication", error);
      setErrorMessage("Server side error");
    }
  };

  useEffect(() => {
    // Clear error message when the component mounts
    setErrorMessage(null);
  }, []);

  return (
      <>
      <h1 className="text-center font-bold text-3xl b-4 text-gray-900 mb-2">
        Log in 
      </h1>
      <form
        className="max-w-md mx-auto h-fit bg-sky-950 bg-opacity-100 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 space-y-4"
        onSubmit={handleLogin}
      >
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}

        <Form.Field className="flex flex-col">
          <label htmlFor="username" className="mb-1 font-bold text-white">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-cyan-900"
          />
        </Form.Field>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 font-bold text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-cyan-900"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-cyan-900 hover:bg-cyan-950 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </div>

        <div className="ml-10 text-center hover:bg-slate-900 size-fit align-middle text-white mt-4">
          <Link to="/sign_up">Don't have an account yet? Sign Up </Link>
        </div>
      </form>
      </>
  );
};

export default Login;
