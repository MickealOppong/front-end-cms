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


  return <section className={`mt-8 w-full px-16 h-[300vh] `
  }>
    <div className="flex bg-white justify-between p-4 border-2 rounded-md mr-8">
      <Form className="flex items-center gap-x-4 px-4">
        {/**PAGE SIZE  */}
        <div className="flex gap-x-2 items-center">
          <span className="text-slate-400">showing</span>
          <SimpleSelect size={'w-16'} data={[5, 10, 15, 20]} defaultValue={pageSize} name={'pageSize'} />
        </div>
        {/**SEARCH */}
        <div className="flex items-center border-2 p-2 rounded-md">
          <input type="search" name='name' placeholder="Search products" className=" w-[20vw] outline-none indent-2 " />
          <button className="ml-2"><FaSearch className="text-slate-400" /></button>
        </div>
      </Form>
      {/**ADD NEW */}
      <Link className="flex items-center btn btn-ghost border-cyan-700  w-36 hover:bg-primary hover:text-gray-200 " to='/addProduct'>
        <FaPlus />
        <span>Add new</span>
      </Link>
    </div>
    <div className="mr-8" >
      <ProductsContainer />
    </div>
    <div>
      <PaginationContainer />
    </div>
  </section>

}
export default Products