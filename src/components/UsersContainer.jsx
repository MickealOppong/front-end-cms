import { useLoaderData } from "react-router-dom";
import User from "./User";

const UsersContainer = () => {
  const { users } = useLoaderData();
  const keys = Object.keys(users[0])
  const map = new Map();
  keys.map((i) => {
    map.set(i, i);
  })
  map.set('actions', 'actions')
  const data = Object.fromEntries(map)
  const { id, username, actions, telephone } = data;
  return <div className="flex flex-col gap-y-2 w-[100vw]">
    <div className="flex justify-between  p-4 text-slate-600 uppercase   text-xs mb-2 border-b-[1px]">
      <div className="w-36">
        <p>{id}</p>
      </div>
      <div className="w-96">
        <p className="ml-8">Full Name</p>
      </div>
      <div className="w-96">
        <p className="ml-8">{username}</p>
      </div>
      <div className="w-96">
        <p className="ml-8">{telephone}</p>
      </div>
      <div className="w-96">
        <p className="ml-12">{actions}</p>
      </div>
    </div>
    {
      users.map((user, index) => {
        return <div key={user.id} className={`border-b-[1px] ${index % 2 === 0 ? ' ' : ''}`}>
          <User  {...user} />
        </div>
      })
    }
  </div>
}
export default UsersContainer;