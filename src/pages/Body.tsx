import React, { useState } from "react";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [userData, setUserData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  const handleSearch = async () => {
    setError(null);
    setUserData(null);

    if (!username) {
      setError("Please enter a username.");
      return;
    }

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      setUserData(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className={` ${isDarkMode ? "  text-black" : "  text-black"} flex items-center justify-center`}>
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleDarkMode}
            className={`w-16 h-8 flex items-center rounded-full p-1 transition-colors ${
              isDarkMode ? "bg-[#7e7878]" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow transform transition-transform ${
                isDarkMode ? "translate-x-8" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>
        <div className="w-full max-w-md p-4 shadow-2xl rounded mt-20 bg-white dark:bg-[#a7d7e7]">
          <h1 className="text-2xl font-bold text-center mb-4">
            GitHub User Search
          </h1>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {userData && (
            <div className="border-t pt-4 mt-4">
              <img
                src={userData.avatar_url}
                alt={userData.login}
                className="w-24 h-24 mx-auto rounded-full"
              />
              <h2 className="text-xl font-semibold text-center mt-2">
                {userData.name || "No Name"}
              </h2>
              <p className="text-center text-gray-600">@{userData.login}</p>
              <p className="text-center mt-2">
                {userData.bio || "No bio available"}
              </p>
              <div className="mt-4 flex justify-around">
                <div className="text-center">
                  <p className="text-lg font-bold">{userData.followers}</p>
                  <p className="text-sm">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">{userData.following}</p>
                  <p className="text-sm">Following</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">{userData.public_repos}</p>
                  <p className="text-sm">Repositories</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
