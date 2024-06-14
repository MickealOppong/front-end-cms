import { FaPlus, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Form, Link, useLoaderData } from "react-router-dom";
import { CategoryContainer, PaginationContainer } from "../components";
import { customFetch } from "../util";
const categoriesQuery = (page, token) => {
  return {
    queryKey: ['categories', page ? parseInt(page) : 0],
    queryFn: async () => customFetch.get(`/api/products/categories?page=${page ?? 0}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

}
export const loader = (store, queryClient) => async ({ request }) => {

  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
  const token = store.getState().userState.token;
  const query = categoriesQuery(params.page, token)

  const response = await queryClient.fetchQuery(query)

  const categories = response.data;
  const page = response.data.number;
  const pageCount = response.data.totalPages;
  const size = response.data.size;
  const totalElements = response.data.totalElements;
  return { categories, page, pageCount, size, totalElements }

}
const Categories = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const { categories } = useLoaderData();

  const width = () => {
    return ` ${showSidebar ? 'lg:w-[70vw]' : 'lg:w-[90vw] '}`
  }


  return <section className={`mt-8 px-8 h-[90vh] `
  }>
    <div className={`text-black tracking-wider font-semibold uppercase mb-8 `}>
      <h2>All Categories</h2>
    </div>
    <div className={`flex flex-col bg-white  p-4 border-2 rounded-md  w-full h-[65vh]`}>
      <div className="flex justify-between">
        <Form className="flex items-center gap-x-4 px-4">
          {/**SEARCH */}
          <div className="flex items-center border-2 p-2 rounded-md">
            <input type="search" name='name' placeholder="Search products" className=" w-[20vw] outline-none indent-2 " />
            <button className="ml-2"><FaSearch className="text-slate-400" /></button>
          </div>
        </Form>
        {/**ADD NEW */}
        <Link className="flex items-center btn btn-ghost border-cyan-700  w-36 hover:bg-primary hover:text-gray-200 " to='/category'>
          <FaPlus />
          <span>Add new</span>
        </Link>
      </div>
      <div className="flex overflow-scroll no-scrollbar flex-col rounded-xl">
        <CategoryContainer categories={categories} />
      </div>
    </div>
    <div >
      <PaginationContainer />
    </div>

  </section>
}
export default Categories;