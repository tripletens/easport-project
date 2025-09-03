import { useState } from "react";

const dummyUsers = [
  { username: "Bi85pe", password: "abcde" },
  { username: "analyst", password: "password" },
];

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const user = dummyUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setError("");
      onLogin(user);
    } else {
      setError("⚠️ Invalid username or password");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="w-full h-full flex items-center justify-center bg-white/90 backdrop-blur-md p-8">
        <div className="w-full max-w-lg">
          
          <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-4">
            🎮 Welcome Back
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Login to access your eSports dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition transform hover:scale-[1.02]"
            >
              Login
            </button>
          </form>

          {error && (
            <p className="text-red-500 mt-4 text-center text-sm font-medium">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
