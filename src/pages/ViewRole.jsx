import { useSelector } from "react-redux";
import { redirect, useLoaderData } from "react-router-dom";
import RoleInfo from "../components/RoleInfo";
import { customFetch } from "../util";
export const loader = (store) => async ({ params }) => {
  const token = store.getState().userState.token;
  const { id } = params;
  try {
    const response = await customFetch.get(`/api/roles/role/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const roleInfo = response.data;
    return {
      roleInfo
    }
  } catch (error) {
    if (error.response.status === 4001) {
      return redirect('')
    }
    return null;
  }
}
const ViewRole = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const { roleInfo } = useLoaderData();
  // const { role, authorities } = roleInfo;
  //const keys = Object.keys(authorities);
  //keys.sort();

  return <section className={`mt-24 lg:mt-8 h-[120vh] max-w-6xl mx-auto w-[90%] px-4`
  }>
    <div className="text-black font-semibold uppercase mb-8">
      <h2>User Role</h2>
    </div>
    <article className="flex flex-col bg-white">
      <RoleInfo {...roleInfo} />
    </article>
  </section>
}
export default ViewRole