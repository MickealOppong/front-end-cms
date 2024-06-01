import { FaSquare } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import img from '../assets/icon.png';
import { Address, UserInformation } from "../components";
import { customFetch } from "../util";

const viewUserQuery = (id, token) => {
  return {
    queryKey: ['viewUser', id],
    queryFn: () => customFetch.get(`/api/users/${id}`, {
      params: {
        id
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

}
export const loader = (store, queryClient) => async ({ params }) => {
  const token = store.getState().userState.token;
  const { id } = params;
  const response = await queryClient.ensureQueryData(viewUserQuery(id, token))
  console.log(response.data);
  const userInfo = response
    .data;
  return {
    userInfo
  }
}
const ViewUser = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const { userInfo } = useLoaderData();

  const { fullname, username, roles, image, addressBook, telephone } = userInfo;
  return <section className={`mt-8 h-[250vh] ${showSidebar ? 'w-[80vw]' : 'w-[100vw]'} px-10`
  }>
    <div className={`flex gap-x-8 mb-10 uppercase font-bold ${showSidebar ? '' : 'max-w-[80%] mx-auto'}`}>
      <h2>User profile</h2>
    </div>

    <div className={`flex gap-x-8 ${showSidebar ? '' : 'max-w-[80%] mx-auto'}`}>
      <div className="flex flex-col bg-white p-8 w-[65%] border-2 shadow-md">
        <div className="flex items-center py-4">
          <div className="mr-12">
            <img src={image || img} alt={username} className="w-36 h-36 rounded-full" />
          </div>
          {/** FULLNAME */}
          <div className="flex">
            <h2 className="text-3xl capitalize">{fullname}</h2>
          </div>
        </div>
        <div className="flex flex-col border-t-2 border-dotted py-2 uppercase text-xs">
          <p className="text-[10px]">role</p>
          <div>
            {
              roles.map((role) => {
                const { id, roleName } = role;
                return <ul key={id}>
                  <li className="flex items-center gap-x-2">
                    <span><FaSquare className="text-[5px]" /></span>
                    <p className="text-[8px] text-slate-500">{roleName}</p>
                  </li>
                </ul>
              })
            }
          </div>
        </div>

      </div>
      <div className="flex flex-col bg-white p-4 w-[35%] border-2 rounded-md">
        <Address {...addressBook} telephone={telephone} username={username} />
        <div className="flex flex-col mt-4 gap-y-2 border-dotted border-t-2 py-2">
          <div className="flex justify-between">
            <p className="w-24">Email:</p>
            <p className="text-sky-400">{username}</p>
          </div>
          <div className="flex justify-between">
            <p>Telephone:</p>
            <p className="text-sky-400">{telephone || '900-800-901'}</p>
          </div>
        </div>
      </div>
    </div>
    <UserInformation />
  </section>
}
export default ViewUser;