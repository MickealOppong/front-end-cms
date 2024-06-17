import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { Log } from "../components/index";
import { customFetch } from "../util";

const viewCategoryQuery = (id, token) => {
  return {
    queryKey: ['category', id],
    queryFn: () => customFetch.get(`/api/products/categories/${id}`, {
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
  const response = await queryClient.ensureQueryData(viewCategoryQuery(id, token))
  const singleCategory = response.data;
  return {
    singleCategory
  }
}

const ViewCategory = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const { singleCategory } = useLoaderData();
  const { id, name, description, createdAt, createdBy, modifiedAt, modifiedBy, quantity, sale } = singleCategory;




  return <section className={`mt-24 lg:mt-8 max-w-6xl mx-auto w-full px-8`
  }>

    <div className="text-black font-semibold uppercase mb-8">
      <h2>Category information</h2>
    </div>
    <article className="flex flex-col gap-y-8 ">
      <div className="flex  flex-col lg:flex-row gap-y-4 items-start justify-between bg-white p-4">
        <div className="flex flex-col">
          <h2>Category information</h2>
        </div>
        <div className="flex flex-col gap-y-4 w-full">
          {/** NAME */}
          <div className="flex flex-col gap-y-2 w-full">
            <span>Identifier</span>
            <p className="border-2 p-2 rounded-xl indent-2 capitalize">{name}</p>
          </div>

          {/** DESCRIPTION*/}
          <div className="flex flex-col gap-y-2 w-full">
            <span>Description</span>
            <p className="border-2 p-2 rounded-xl indent-2 capitalize">{description}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-y-4 items-start justify-between bg-white p-4">
        <div className="flex flex-col">
          <h2>Transaction information</h2>
        </div>
        <div className="flex flex-col gap-y-4 w-full">
          {/** QUANTITY PURCHASED */}
          <div className="flex flex-col gap-y-2">
            <span>Quantity</span>
            <p className="border-2 p-2 rounded-xl indent-2 capitalize h-10">{quantity}</p>
          </div>

          {/** QUANTITY SOLD */}
          <div className="flex flex-col gap-y-2 w-full">
            <span>Sold</span>
            <p className="border-2 p-2 rounded-xl indent-2 capitalize h-10">{sale}</p>
          </div>
        </div>
      </div>
      <Log {...singleCategory} />
    </article>

  </section>
}
export default ViewCategory;