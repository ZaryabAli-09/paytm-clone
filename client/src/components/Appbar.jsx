import { useSelector } from "react-redux";

export function Appbar() {
  const user = useSelector((state) => state.user);

  return (
    <div className="flex justify-between shadow h-14">
      <div className="flex justify-between items-center h-full ml-4 text-3xl font-bold">
        PayTM App
      </div>
      <div className="flex justify-between items-center h-full mr-4 font-semibold">
        <div className="font-thin">Hello</div>
        <div className="flex justify-center items-center rounded-full bg-slate-200 p-2 h-12  mt-1 mr-2 ml-2">
          <div className=" text-xm font-extralight">
            {user && user.payload.user.username}
          </div>
        </div>
      </div>
    </div>
  );
}
