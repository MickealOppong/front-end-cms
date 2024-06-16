import { useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { roleData } from "../util/data";
import { customFetch } from '../util/index';
const singleRoleQuery = (id, token) => {
  return {
    queryKey: ['singleRole', id],
    queryFn: () => customFetch.get(`/api/roles/role/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
export const loader = (store, queryClient) => async ({ params }) => {
  const token = store.getState().userState.token;
  const { id } = params;
  try {

    const response = await queryClient
      .ensureQueryData(singleRoleQuery(id, token))
    const singleRole = response.data;
    return {
      singleRole
    }
  } catch (error) {
    console.log(error);
    return null
  }
}
const EditRole = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const [data, setData] = useState(roleData)
  const token = useSelector((state) => state.userState.token)
  const navigate = useNavigate();
  const { singleRole } = useLoaderData();

  const { role, authorities } = singleRole;
  const keys = Object.keys(authorities);




  return <section className={`mt-8 h-[150vh] max-w-6xl mx-auto px-8`
  }>
    <h2>Edit role</h2>

  </section>
}
export default EditRole