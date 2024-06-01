import { FaPlus, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PaginationContainer, UsersContainer } from "../components/index";
import { updateUser } from "../features/user/userSlice";
import { customFetch } from '../util/index';

const usersQuery = (page, token) => {
  return {
    queryKey: ['users'],
    queryFn: () => customFetch.get(`/api/users/users?page=${page ?? 0}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

}
export const loader = (store, queryClient) => async ({ request }) => {
  const token = store.getState().userState.token;
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);

  const response = await queryClient.ensureQueryData(usersQuery(params.id, token))
  //console.log(response.data);
  const users = response.data.content;
  const user = store.getState().userState.user;
  const item = users.find((i) => i.id === user.id)
  store.dispatch(updateUser(item))
  const page = response.data.number;
  const pageCount = response.data.totalPages;
  const size = response.data.size;
  const totalElements = response.data.totalElements;
  return { users, page, pageCount, size, totalElements }
}
const Users = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)


  return <section className={`mt-8 ${showSidebar ? 'w-[80vw]' : 'w-[100vw]'}  px-8 h-[90vh] `
  }>
    <div className={`text-black tracking-wider font-semibold uppercase mb-8 mx-auto ${showSidebar ? 'max-w-6xl' : 'max-w-9xl'}`}>
      <h2>All users</h2>
    </div>
    <div className={`flex flex-col bg-white  p-4 border-2 rounded-md  w-full ${showSidebar ? 'w-[80vw]' : 'w-[100%]'} h-[65vh]`}>
      <div className="flex justify-between">
        {/**SEARCH */}
        <form className="flex items-center border-[1px] rounded-md border-gray-300 px-4">
          <input type="search" name='username' placeholder="Search user" className=" w-[20vw] outline-none indent-2" />
          <button><FaSearch /></button>
        </form>

        {/**ADD NEW */}
        <Link className="flex items-center btn btn-ghost border-cyan-700  w-36 hover:bg-primary hover:text-gray-200 " to='/addUser'>
          <FaPlus />
          <span>Add new</span>
        </Link>
      </div>
      <div>
        <div className="flex overflow-scroll no-scrollbar flex-col rounded-xl">
          <UsersContainer />
        </div>
        <div className="flex justify-end">
          <PaginationContainer />
        </div>
      </div>

    </div>


  </section>
}
export default Users