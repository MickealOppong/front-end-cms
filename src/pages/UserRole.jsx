import axios from "axios";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { ListView, SectionTitle, TransferList } from "../components/index";
import { clearFromLocalStorage, customFetch } from '../util/index';


export const loader = (store) => async () => {
  const token = store.getState().userState.token;
  const varA = customFetch.get("/api/users/userList", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const varB = customFetch.get("/api/roles/roleList", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const response = await axios.all([varA, varB]).then((res) => {
    return res;
  }).catch((err) => {
    return err;
  })
  const userList = response[0]?.data;
  const roleList = response[1]?.data;
  return {
    userList,
    roleList
  }

}

const UserRole = () => {
  const { userList, roleList } = useLoaderData();
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const list = useSelector((state) => state.listViewState.listData);
  console.log(list);
  const handleUserRole = () => {
    const formData = new FormData();

    formData.append('data', JSON.stringify
      (list))

    const d = Object.fromEntries(formData);

    console.log(d);
    clearFromLocalStorage();
  }

  return <section className={`mt-8 ${showSidebar ? 'w-[80vw]' : 'w-[100vw]'} px-8 h-[200vh] `
  }>
    <SectionTitle title='Assign role to user' style="text-black text-xl font-semibold uppercase mb-8" />
    <div className="bg-slate-100 flex flex-col gap-y-12 items-center p-8" >
      <TransferList data={userList} rightContainerTitle='Users' leftContainerTitle='Selected Users' title='users' size='w-56 h-56' />
      <ListView data={roleList} leftContainerTitle='Selected roles' rightContainerTitle='Available Roles' title='roles' size='w-56 h-56' />
    </div>
    <div className="mt-12">
      <button className="btn btn-secondary w-36" onClick={() => handleUserRole()}>save</button>
    </div>
  </section >
}
export default UserRole;