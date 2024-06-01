const Log = ({ createdAt, createdBy, modifiedAt, modifiedBy }) => {
  return <div className="flex items-start justify-between bg-white p-4">
    <div>
      <h2>Activity log</h2>
    </div>
    {/** CREATED BY */}
    <div className="flex flex-col gap-y-4 w-1/2 text-slate-500">
      <div className="flex">
        <span className="w-36">Created by</span>
        <p>{createdBy}</p>
      </div>
      {/** CREATED DATE */}
      <div className="flex ">
        <span className="w-36">Created date</span>
        <p>{new Date(createdAt).toLocaleString()}</p>
      </div>
      {/** MODIFIED BY */}
      <div className="flex">
        <span className="w-36">Modified by</span>
        <p>{modifiedBy}</p>
      </div>
      {/** MODIFIED DATE */}
      <div className="flex ">
        <span className="w-36">Modified date</span>
        <p>{new Date(modifiedAt).toLocaleString()}</p>
      </div>
    </div>
  </div>
}
export default Log