import { useLoaderData } from "react-router-dom";
import Role from "./Role";


const RolesContainer = () => {
  const { roles } = useLoaderData();


  //console.log(roles);
  return <div className="flex flex-col">
    <div>
      <div className="flex uppercase text-xs justify-between  p-4 text-slate-600 mb-4 border-b-[1px]">
        <div className="w-1/2">
          <h2>Id</h2>
        </div>
        <div className="w-1/2">
          <h2 >name</h2>
        </div>
        <div className="hidden md:flex w-1/2">
          <h2 >created At</h2>
        </div>
        <div className="w-1/2">
          <h2 >Actions</h2>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-y-2">
      {
        roles.map((role, index) => {

          return <div key={role.id} className={`border-b-[1px] ${index % 2 === 0 ? '' : ''} `}>
            <Role  {...role} />
          </div>
        })
      }
    </div>
  </div>
}
export default RolesContainer;