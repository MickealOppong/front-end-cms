import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { customFetch, formatPriceLocale } from "../util";


const SingleProduct = ({
  id, images, name, description, quantity,
  regularPrice, status, quantitySold, categories, createdBy
}) => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const { fx, iso } = useSelector((state) => state.selectState.currency)

  const [showItems, setShowItems] = useState(false);


  const { mutate: deleteProduct } = useMutation({
    mutationFn: (id, token) => customFetch.delete(``, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  })
  const handleDelete = (id) => {


  }

  return <article className="relative w-full" onMouseOver={() => setShowItems(true
  )} onMouseLeave={() => setShowItems(false)}>
    <div className={`flex flex-col bg-white  md:w-full items-center p-4`} >
      <div className="flex items-center gap-x-2 text-emerald-500 w-full">
        <img src={images[0]} className="w-[85vw] md:w-full h-60" />
      </div>
      <div className="flex flex-col gap-y-2 w-full p-4  text-slate-600">
        <p className="uppercase">{name}</p>
        <div className="flex items-center gap-x-2 capitalize">
          <span>categories :</span>
          <div className="flex items-center gap-x-2">
            {
              categories.map((item) => {
                const { id, name } = item;
                return <p key={id}>{name}</p>
              })
            }
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-x-2">
            <span className="text-gray-400">Stock :</span>
            <p className="text-gray-400">{quantity}</p>
          </div>
          <div className="flex items-center h-12 w-18 bg-slate-100 font-semibold p-2">
            <p>{formatPriceLocale(regularPrice, iso, fx)}</p>
          </div>
        </div>
      </div>
    </div>

    {/** ACTIONS */}
    <div className={`flex w-80 gap-x-1 absolute top-8  ${showItems ? `${showSidebar ? 'opacity-100 left-[71%]' : 'opacity-100 left-[69%]'}` : 'opacity-0 left-[80%]'} duration-300`} >
      <div className="flex items-center justify-center bg-emerald-400  w-8 h-6">
      </div>
      <div className="flex items-center  justify-center bg-red-400 text-xs w-8 h-6 text-gray-100">
        <button onClick={() => handleDelete(id)}><LiaTimesSolid /></button>
      </div>
    </div>
  </article >

}
export default SingleProduct