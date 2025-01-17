import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { useSelector } from "react-redux";

export function SendMoney() {
  const user = useSelector((state) => state.user);
  console.log(user);

  const [param] = useSearchParams();
  const id = param.get("id");
  const toName = param.get("name");
  const amountRef = useRef("");

  async function onInitiateTransfer() {
    const amount = parseFloat(amountRef.current.value);

    const formData = {
      to: id,
      amount: amount,
    };
    const res = await fetch(
      "http://localhost:3000/api/v1/account/tranfer-balance",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();
    if (res.ok) {
      console.log(data);
    }
  }

  return (
    <>
      <Appbar />
      <Balance />
      <div className="flex justify-center bg-gray-100 h-screen">
        <div className="flex items-center h-full">
          <div className="border h-min bg-white max-w-md p-4 w-96 space-y-8 shadow-lg rounded-lg">
            <div className="flex flex-col space-y-1.5 p-6">
              <h2 className="text-center text-3xl font-semibold">Send Money</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex justify-center items-center rounded-full bg-green-700 h-12 w-12 mt-1 mr-2 ml-2">
                <span className=" text-xl text-white">
                  {toName.split("")[0]}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{toName}</h3>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="amount"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Amount (in $)
              </label>
              <input
                ref={amountRef}
                type="number"
                id="amount"
                placeholder="Enter amount"
                className="rounded-md border px-3 py-2 text-sm w-full h-10"
              />
            </div>
            <button
              onClick={onInitiateTransfer}
              className="text-sm font-medium h-10 px-4 py-2 w-full bg-green-700 text-white"
            >
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
