import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { Slider } from "../components";
import { formatPrice } from "../util/index";

const colours = ['colour', 'color', 'colours', 'colors']
const productQuery = (id, token) => {
  return {
    queryKey: ['product', id],
    queryFn: () => customFetch.get(`/api/products/product/${id}`, {
      params: {
        id
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

}
export const loader = (store, queryClient) => async ({ request }) => {
  const token = store.getState().userState.token;
  const { id } = params;
  const response = await queryClient.fetchQuery(productQuery(id, token))
  console.log(response);
  const singleProduct = response
    .data;
  return {
    singleProduct
  }

}
const ViewProduct = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)

  const width = () => {
    return ` ${showSidebar ? 'lg:w-[25vw]' : 'lg:w-[30vw] '}`
  }

  const { singleProduct } = useLoaderData();
  let keys = Object.keys(singleProduct.attributes)

  const { id, name, description, images, categories, quantity, regularPrice, salePrice, status, features } = singleProduct.product;
  console.log(singleProduct.attributes);


  return <section className={`mt-8 h-[250vh] ${showSidebar ? 'w-[80vw]' : 'w-[100vw]'} `
  }>
    <article className={` p-8 ${showSidebar ? 'mr-8' : 'max-w-6xl mx-auto px-16'}`}>
      <div className="flex justify-between gap-x-8">
        <div>
          <Slider images={images} />
        </div>
        <div className="flex flex-col gap-y-4 w-full ">
          <div >
            <h2 className="text-slate-500 font-semibold mb-4"> Product Name</h2>
            <p className="text-3xl text-cyan-700 capitalize">{name}</p>
          </div>
          <div className="mt-10">
            <h2 className="text-slate-500 font-semibold mb-4">Description</h2>
            <p>{description}</p>
          </div>
          <div className="mt-10">
            <h2 className="text-slate-500 font-semibold mb-4">Features</h2>
            <p>{features}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2  p-4 mt-10">
        <div className="flex flex-col gap-y-4">
          <div className="flex gap-x-2 text-slate-400">
            <p className="text-slate-500 font-semibold w-44">Stock Quantity</p>
            <p>{quantity}</p>
          </div>
          <div className="flex gap-x-2 text-slate-400">
            <p className="text-slate-500 font-semibold w-44">Regular Price</p>
            <p>{formatPrice(regularPrice)}</p>
          </div>
          <div className="flex gap-x-2 text-slate-400">
            <p className="text-slate-500 font-semibold w-44">Reduction price</p>
            <p>{formatPrice(salePrice)}</p>
          </div>
          <div className="flex gap-x-2 text-slate-400">
            <p className="text-slate-500 font-semibold w-44">Publication Status</p>
            <p className={`${status === 'DRAFT' ? 'text-rose-500' : 'text-emerald-500'}`}>{status}</p>
          </div>
        </div>
        <div className="flex items-center uppercase gap-x-4 py-4 mt-10">
          <p className="text-slate-500 w-44 text-sm font-semibold">Can be found in:</p>
          <div className="flex gap-x-2 uppercase text-cyan-500">
            {
              categories.map((category, index) => {
                const { id, name } = category;
                return <p key={id}>{name}{index === categories.length - 1 ? '' : ','}</p>
              })
            }
          </div>
        </div>
        <div className="uppercase text-xs col-span-8 ">
          <div className="text-sky-500 font-semibold my-6">
            <p>Available in </p>
          </div>
          <div className="flex flex-col w-full ">
            {
              keys.map((k) => {

                return <div className="flex  gap-x-4 ">
                  <div className="flex flex-col gap-2 mb-4" >
                    <h2>{k}</h2>
                    <p className="text-[10px] text-slate-500">quantity</p>
                    <p className="text-[10px] text-slate-500">price</p>
                  </div>
                  <div className="flex gap-2">
                    {
                      singleProduct.attributes[k].map((a) => {
                        return <div key={a.id} className="flex  flex-col items-center gap-y-2">
                          <div className="flex items-center gap-x-2">
                            <span className={`h-3 w-3 rounded-full ${k === 'colour' ? 'flex' : 'hidden'}`} style={{ backgroundColor: a.skuValue }}></span>
                            <p>{a.description}</p>
                          </div>
                          <p>{a.quantity}</p>
                          <p>{formatPrice(a.price)}</p>
                        </div>
                      })
                    }
                  </div>
                </div>
              })
            }
          </div>
        </div>
      </div>
    </article>
  </section >
}

export default ViewProduct