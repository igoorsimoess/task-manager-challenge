import React, { FC, useState } from "react";
import { Form } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom for navigation

interface SignUpProps {
  onSubmit: (username: string, password: string) => void;
}

const SignUp: FC<SignUpProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.status === 201) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", token);
        navigate("/task_manager");
      } else if (response.status === 422) {
        setErrorMessage(
          "Username already taken. Please choose a different one."
        );
      }
    } catch (error) {
      console.error("Error during authentication", error);
    }
  };

  return (
    <div className="bg-slate-100">
      <h1 className="text-center font-bold text-3xl b-4 text-gray-800">
        Sign up
      </h1>
      <form
        className="max-w-md mx-auto h-fit bg-slate-950 bg-opacity-20 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 space-y-4"
        onSubmit={handleSignUp}
      >
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}

        <Form.Field className="flex flex-col">
          <label htmlFor="username" className="mb-1 font-bold">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-gray-500"
          />
        </Form.Field>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 font-bold">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-slate-400"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </button>
        </div>

        <div className="text-center text-gray-600 mt-4">
          <Link to="/login">Already have an account? Login </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
