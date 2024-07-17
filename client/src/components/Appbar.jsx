export function Appbar() {
  return (
    <div className="flex justify-between shadow h-14">
      <div className="flex justify-between items-center h-full ml-4 text-3xl font-bold">
        PayTM App
      </div>
      <div className="flex justify-between items-center h-full mr-4 font-semibold">
        <div>Hello</div>
        <div className="flex justify-center items-center rounded-full bg-slate-200 h-12 w-12 mt-1 mr-2 ml-2">
          <div className=" text-xl">U</div>
        </div>
      </div>
    </div>
  );
}
