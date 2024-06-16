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


  return <section className={`mt-24 lg:mt-8 max-w-7xl mx-auto h-[90vh] px-4 `
  }>
    <div className={`text-black tracking-wider font-semibold uppercase mb-8 max-w-7xl mx-auto `}>
      <h2>All users</h2>
    </div>
    <div className={`flex flex-col bg-white  p-4 border-2 rounded-md max-w-7xl mx-auto w-[85vw] md:w-[75vw] h-[65vh]`}>
      <div className="flex flex-col md:flex-row md:justify-between gap-y-4 mb-4">
        {/**SEARCH */}
        <form className="flex items-center border-[1px] rounded-md border-gray-300 px-4">
          <input type="search" name='username' placeholder="Search user" className="w-full h-12 md:w-[20vw] outline-none indent-2" />
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