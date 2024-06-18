import { FaPlus, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Form, Link, useLoaderData } from "react-router-dom";
import { PaginationContainer, ProductsContainer, SimpleSelect } from "../components/index";
import { customFetch } from "../util";

const productsQuery = (params, token) => {
  return {
    queryKey: ['products', params],
    queryFn: () => customFetch.get(`api/products/products`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
export const loader = (store, queryClient) => async ({ request }) => {
  const token = store.getState().userState.token;
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
  //console.log(params);
  try {
    const response = await queryClient.fetchQuery(productsQuery(params, token))
    const products = response?.data?.products;
    const page = response?.data?.page;
    const pageCount = response?.data?.PageCount;
    const size = response?.data?.size;
    const pageSize = response?.data?.pageSize;
    return { products, page, pageCount, size, pageSize }
  } catch (error) {
    console.log(error);
    return null;
  }



}

const Products = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)

  const { pageSize } = useLoaderData();
  //console.log(pageSize);
  const width = () => {
    return ` ${showSidebar ? 'lg:w-[25vw]' : 'lg:w-[30vw] '}`
  }


  return <section className={`mt-36 lg:mt-8 h-[300vh] px-8 ${showSidebar ? 'max-w-6xl mr-8' : 'max-w-8xl'} duration-300 mx-auto w-full`
  }>
    <div className={`flex flex-col gap-y-4 md:flex-row bg-white lg:gap-x-2 md:justify-between p-4 border-2 rounded w-full`}>
      <Form className="flex flex-col md:flex-row items-center  gap-x-4 lg:px-4 w-full">
        {/**PAGE SIZE  */}
        <div className="hidden lg:flex gap-x-2 items-center">
          <span className="text-slate-400">showing</span>
          <SimpleSelect size={'w-16'} data={[5, 10, 15, 20]} defaultValue={pageSize} name={'pageSize'} />
        </div>
        {/**SEARCH */}
        <div className="flex items-center border-2 p-2 rounded-md w-full md:w-96 ">
          <input type="search" name='name' placeholder="Search products" className=" w-full md:w-80 outline-none indent-2" />
          <button className="ml-2"><FaSearch className="text-slate-400" /></button>
        </div>
      </Form>
      {/**ADD NEW */}
      <Link className="flex items-center btn btn-ghost border-cyan-700 w-36 hover:bg-primary hover:text-gray-200 " to='/addProduct'>
        <FaPlus />
        <span>Add new</span>
      </Link>
    </div>
    <div className="" >
      <ProductsContainer />
    </div>
    <div>
      <PaginationContainer />
    </div>
  </section>

}
export default Products