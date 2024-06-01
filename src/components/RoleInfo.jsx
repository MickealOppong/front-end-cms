import { SingleRole } from '../components/index';
const RoleInfo = ({ role, authorities }) => {
  const keys = Object.keys(authorities);
  keys.sort();
  return <article className="flex flex-col bg-white">
    <div className="flex  items-start justify-between   p-4">
      <div className="flex text-gray-700 capitalize font-bold">
        <h2>role information</h2>
      </div>
      <div className="flex flex-col gap-y-4 w-1/2">
        {/** ROLE NAME */}
        <div className="flex flex-col gap-y-2 w-96">
          <span>Role</span>
          <p className="border-2 p-2 rounded-xl indent-2 capitalize">{role.roleName}</p>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-y-4 w-1/2 p-4 ">
      <div className="flex flex-col capitalize text-xl tracking-wide mb-8 text-slate-700 font-semibold" >
        <h2>permissions</h2>
      </div>
      <article className="flex items-center gap-x-24">
        <div>
          {
            keys.map((label) => {
              return <div key={label} className="flex flex-col capitalize">
                <h2>{label}</h2>
              </div>
            })
          }
        </div>
        <div>
          {
            keys.map((a, index) => {
              return <SingleRole model={authorities[keys[index]]} key={index} />
            })
          }
        </div>
      </article>
    </div>
  </article>
}

export default RoleInfo