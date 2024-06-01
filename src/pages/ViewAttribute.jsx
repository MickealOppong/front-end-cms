import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { Log } from "../components";
import { customFetch } from "../util";
const viewAttributeQuery = (id, token) => {
  return {
    queryKey: ['viewAttribute', id],
    queryFn: () => customFetch.get(`/api/products/attribute/${id}`, {
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
  const response = await queryClient.ensureQueryData(viewAttributeQuery(id, token));
  const singleAttribute = response
    .data;
  //console.log(response);
  return {
    singleAttribute
  }
}
const ViewAttribute = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const { singleAttribute } = useLoaderData();
  //console.log(singleAttribute);

  const { id, name, productSKU } = singleAttribute;
  return <section className={`mt-8 h-[120vh] ${showSidebar ? 'w-[80vw]' : 'w-[100vw]'} px-8`
  }>
    <div className="text-black font-semibold uppercase mb-8">
      <h2>Attribute information</h2>
    </div>
    <article className="flex flex-col gap-y-8 ">
      <div className="flex items-start justify-between bg-white p-4">
        <div className="flex flex-col">
          <h2>Attribute </h2>
        </div>

        <div className="flex flex-col gap-y-4 w-1/2">
          {/** NAME */}
          <div className="flex flex-col gap-y-2 w-96">
            <span>Identifier</span>
            <p className="border-2 p-2 rounded-xl indent-2 capitalize">{name}</p>
          </div>
        </div>

      </div>
      <div className="flex items-start justify-between bg-white p-4">
        <div>
          <h2>Options</h2>
        </div>
        <div className="grid grid-cols-6  w-1/2">
          {
            productSKU.map((sku) => {
              const { id, skuValue } = sku;
              return <div key={id} className="flex flex-col text-slate-500 capitalize">
                <span className="w-6 h-6 rounded-xl" style={{ backgroundColor: `${skuValue}` }}></span>
                <p>{skuValue}</p>
              </div>
            })
          }
        </div>
      </div>
      <Log {...singleAttribute} />
    </article>

  </section>
}
export default ViewAttribute;