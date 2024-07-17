export function Users() {
  return (
    <div className="mx-4">
      <div className="font-bold mt-6 text-lg">Users</div>
      <div>
        <input
          type="text"
          placeholder="Search users..."
          className="mt-2 border border-slate-200 w-full px-2 py-1 rounded"
        />
      </div>
    </div>
  );
}
