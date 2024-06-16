import { FaPlus, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AttributesContainer, PaginationContainer } from "../components/index";
import { customFetch } from "../util";



const attributesQuery = (page, token) => {
  return {
    queryKey: ['attributes', page ? parseInt(page) : 0],
    queryFn: () => customFetch.get(`/api/products/attributes?page=${page ?? 0}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

}

export const loader = (store, queryClient) => async ({ request }) => {
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
  const token = store.getState().userState.token;
  const response = await queryClient.fetchQuery(attributesQuery(params.page, token))

  const attributes = response.data.content;
  const page = response.data.number;
  const pageCount = response.data.totalPages;
  const size = response.data.size;
  const totalElements = response.data.totalElements;
  return { attributes, page, pageCount, size, totalElements }
}
const Attributes = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)

  const width = () => {
    return ` ${showSidebar ? 'lg:w-[70vw]' : 'lg:w-[90vw] '}`
  }

  return <section className={`mt-24 lg:mt-8 w-[95%] px-4 h-[100vh] max-w-7xl mx-auto`
  }>
    <div className="text-black font-semibold uppercase mb-8">
      <h2>All attributes</h2>
    </div>
    <div className={`flex flex-col bg-white  p-4 border-2 rounded-md mx-auto w-full h-[60vh]`}>
      <div className="flex flex-col md:flex-row md:justify-between gap-y-4 mb-2">
        {/**SEARCH */}
        <form className="flex items-center border-[1px] rounded-md border-gray-300 px-4">
          <input type="search" name='attribute' placeholder="Search attribute" className="w-full md:w-[30vw] h-12 outline-none indent-2" />
          <button><FaSearch /></button>
        </form>

        {/**ADD NEW */}
        <Link className="flex items-center btn btn-ghost border-cyan-700 w-44 hover:bg-primary hover:text-gray-200 " to='/attribute'>
          <FaPlus />
          <span>Add new</span>
        </Link>
      </div>
      <div>
        <AttributesContainer />

      </div>

    </div>
    <div className="flex justify-end ">
      <PaginationContainer />
    </div>
  </section>
}
export default Attributes;