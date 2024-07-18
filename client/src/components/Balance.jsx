import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
export const Balance = () => {
  const user = useSelector((state) => state.user);
  const [balance, setBalance] = useState(null);

  async function getBalance() {
    const res = await fetch(
      "http://localhost:3000/api/v1/account/get-balance",
      {
        credentials: "include",
      }
    );
    const data = await res.json();
    if (res.ok) {
      setBalance(Math.round(data.balance.balance));
      console.log(data);
    }
    if (!res.ok) {
      console.log(data);
    }
  }
  useEffect(() => {
    getBalance();
  }, []);
  return (
    <div className="flex ml-4 mt-5">
      <div className="font-bold text-lg">Your balance is</div>
      <div className="font-semibold text-lg text-green-700 ml-2">
        &#8377;{user && balance}
      </div>
    </div>
  );
};
