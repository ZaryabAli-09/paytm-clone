import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Users() {
  const [accUsers, setAccUsers] = useState([]);
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();
  async function handleUsersInput(e) {
    setUserInput(e.target.value);
  }

  async function fetchAllUsers(query) {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/user/bulk?filter=${query}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();

      if (res.ok) {
        setAccUsers(data.users);
      }
      if (!res.ok) {
        alert(data.message);
      }
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    fetchAllUsers(userInput);
  }, [userInput]);
  return (
    <div className="mx-4">
      <div className="font-bold mt-6 text-lg">Users</div>
      <div>
        <input
          onChange={handleUsersInput}
          type="text"
          placeholder="Search users..."
          className="mt-2 border border-slate-200 w-full px-2 py-1 rounded"
        />
      </div>
      {accUsers && accUsers.length > 0
        ? accUsers.map((acc) => {
            return (
              <div
                key={acc._id}
                className="w-full flex justify-between bg-gray-200 p-2 mt-1"
              >
                <span className=" font-bold bg-black text-white p-1 rounded-full">
                  {acc.username}
                </span>
                <button
                  onClick={(e) => {
                    navigate(`/send?id=${acc._id}&name=${acc.username}`);
                  }}
                  className="font-semibold cursor-pointer rounded-lg bg-black px-2 text-white"
                >
                  Send Money
                </button>
              </div>
            );
          })
        : ""}
    </div>
  );
}
