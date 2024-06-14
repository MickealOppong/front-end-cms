import { FaPlus, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CurrencyContainer, PaginationContainer } from "../components";
import { customFetch } from "../util";
const currenciesQuery = (page, token) => {
  return {
    queryKey: ['currencies', page ? parseInt(page) : 0],
    queryFn: async () => customFetch.get(`/api/currency/all?page=${page ?? 0}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

}
export const loader = (store, queryClient) => async ({ request }) => {
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
  const token = store.getState().userState.token;
  const query = currenciesQuery(params.page, token)
  const response = await queryClient.fetchQuery(query)
  const currencyList = response.data.content;
  const page = response.data.number;
  const pageCount = response.data.totalPages;
  const size = response.data.size;
  const totalElements = response.data.totalElements;
  return { currencyList, page, pageCount, size, totalElements }
}
const Currencies = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  return <section className={`mt-8 w-11/12 max-w-6xl mx-auto px-2 h-[100vh] `
  }>

    <div className={`text-black tracking-wider font-semibold uppercase mb-8  `}>
      <h2>All Currencies</h2>
    </div>

    <div className={`flex flex-col bg-white  p-4 border-2 rounded-md  w-full ${showSidebar ? 'w-[80vw]' : 'w-[100%]'} h-[65vh]`}>
      <div className="flex justify-between">
        {/**SEARCH */}
        <form className="flex items-center border-[1px] rounded-md border-gray-300 px-4">
          <input type="search" name='currency' placeholder="Search currency" className=" w-[20vw] outline-none indent-2" />
          <button><FaSearch /></button>
        </form>

        {/**ADD NEW */}
        <Link className="flex items-center btn btn-ghost border-cyan-700  w-36 hover:bg-primary hover:text-gray-200 " to='/currency'>
          <FaPlus />
          <span>Add new</span>
        </Link>
      </div>

      <div >
        <CurrencyContainer />
      </div>

    </div>
    <div>
      <PaginationContainer />
    </div>
  </section>
}

export default Currencies