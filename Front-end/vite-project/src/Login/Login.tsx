import { FC, useState } from "react";
import { Form } from "semantic-ui-react";
import axios from "axios";
interface LoginProps {
  onSubmit: (username: string, password: string) => void;
}

const Login: FC<LoginProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    console.log("here");
    e.preventDefault();

    try {
      console.log("Logging in...", username, password);

      const response = await axios.post(
        "http://127.0.0.1:3000/auth/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 202) {
        const data = response.data;
        console.log("Login successful", data);
        const token = data.token;
        localStorage.setItem("token", token);
        // onSubmit(username, password);
      } else {
        // Handle authentication error
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error during authentication", error);
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-100">
      <h1 className="text-center font-bold text-3xl b-4 text-gray-800">
        Log In
      </h1>
      <form
        className="max-w-md mx-auto h-fit bg-slate-950 bg-opacity-20 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 space-y-4"
        onSubmit={handleLogin}
      >
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
            // onClick={(e) => (handleLogin(e))}
            className="bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
