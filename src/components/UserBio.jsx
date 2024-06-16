import { useLoaderData } from "react-router-dom";

const UserBio = () => {
  const { userInfo } = useLoaderData();
  const { fullname, username, authorities, roles, enabled, accountNonExpired, accountNonLocked, credentialsNonExpired, gender, telephone } = userInfo;
  return <section className="flex flex-col">
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
      {/**FULL NAME */}
      <div className="flex flex-col gap-y-4 capitalize">
        <label >full Name</label>
        <input type="text" value={fullname} className="border-2 border-slate-300 p-2 rounded-md bg-slate-50 outline-none" contentEditable={false} />
      </div>
      {/**USERNAME */}
      <div className="flex flex-col  gap-y-4 capitalize">
        <label >Username</label>
        <input type="text" value={username} className="border-2 border-slate-300 p-2 rounded-md bg-slate-50 outline-none" contentEditable={false} />
      </div>
      {/**GENDER*/}
      <div className="flex flex-col  gap-y-4 capitalize">
        <label >Gender</label>
        <input type="text" value={gender} className="border-2 border-slate-300 p-2 rounded-md bg-slate-50 outline-none" contentEditable={false} />
      </div>
      {/**TELEPHONE*/}
      <div className="flex flex-col  gap-y-4 capitalize">
        <label >telephone</label>
        <input type="text" value={telephone} className="border-2 border-slate-300 p-2 rounded-md bg-slate-50 outline-none" contentEditable={false} />
      </div>
    </div>
    <div className="flex flex-col lg:grid lg:grid-cols-2 mt-10 gap-4">
      {/**ACCOUNT ENABLED */}
      <div className="flex gap-x-4 ">
        <label className="w-56" >Account enabled</label>
        <input type="checkbox" checked={enabled} className="checkbox  checkbox-secondary" />
      </div>
      {/**ACCOUNT NON EXPIRED */}
      <div className="flex gap-x-4 ">
        <label className="w-56">Account Non-Expired</label>
        <input type="checkbox" checked={accountNonExpired} className="checkbox  checkbox-secondary" />
      </div>
      {/**ACCOUNT NON LOCKED */}
      <div className="flex gap-x-4 ">
        <label className="w-56" >Account Non-Locked</label>
        <input type="checkbox" checked={accountNonLocked} className="checkbox  checkbox-secondary" />
      </div>

      {/**CREDENTIALS NON EXPIRED */}
      <div className="flex gap-x-4 ">
        <label className="w-56" >Credentials Non-Expired</label>
        <input type="checkbox" checked={credentialsNonExpired} className="checkbox  checkbox-secondary" />
      </div>
    </div>
  </section>

}
export default UserBio