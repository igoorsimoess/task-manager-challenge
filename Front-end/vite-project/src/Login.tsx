import React, { FC, useEffect, useState } from "react";

interface LoginProps {
  onSubmit: (username: string, password: string) => void;
  initialUsername?: string;
  initialPassword?: string;
}

const Login: FC<LoginProps> = ({
  onSubmit,
  initialUsername = "",
  initialPassword = "",
}) => {
  const [username, setUsername] = useState(initialUsername);
  const [password, setPassword] = useState(initialPassword);

  useEffect(() => {
    setUsername(initialUsername);
    setPassword(initialPassword);
  }, [initialUsername, initialPassword]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
  };
  return (
    <div>
      <h1 className="text-center font-bold text-3xl mb-2 text-gray-800">
        Log In
      </h1>
      <form
        className="max-w-md mx-auto h-fit bg-slate-950 bg-opacity-20 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 space-y-4 "
        onSubmit={handleLogin}
      >
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-1 font-bold">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-slate-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 font-bold">
            Password
          </label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-slate-400"
          />
        </div>
        <div>
          <button
            onClick={(e) => handleLogin(e)}
            className="bg-slate-700 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
