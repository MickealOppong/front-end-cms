
const SingleRole = ({ model }) => {
  function extractStr(str) {
    const temp = str.search(':')
    return str.substr(temp + 1, str.length)
  }
  return <div className="flex gap-x-24 px-4">
    {
      model.map((item) => {
        const { id, privilege, model } = item;
        return <div className="flex gap-x-2 items-center text-md text-gray-500 capitalize" key={privilege}>
          <p>{extractStr(privilege)}</p>
          <input type="checkbox" checked className="checkbox checkbox-secondary checkbox-xs" readOnly />
        </div>
      })
    }
  </div>
}
export default SingleRole