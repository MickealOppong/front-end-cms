import { useMutation } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { customFetch } from "../util";
const SingleCurrency = ({ recId, currency, iso, createdAt }) => {

  const { mutate: handleDelete } = useMutation({
    mutationKey: ['categories'],
    mutationFn: (recId) => customFetch.delete(`/api/products/category/${recId}`, {
      params: {
        recId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
    onSuccess: () => {
      //queryClient.removeQueries(['categories'])
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      return navigate('/categories')
    },
    onError: (err) => { console.log(err); }

  })
  return <article className="flex w-[100vw] capitalize text-slate-600 text-sm" >
    {/**NAME */}
    <div className="flex  items-center w-96">
      <p >{currency}</p>
    </div>
    {/**DESCRIPTION */}
    <div className="flex items-center w-56">
      <p >{iso}</p>
    </div>
    {/**CREATE AT */}
    <div className="flex items-center w-56">
      <p className="">{new Date(createdAt).toDateString()}</p>
    </div>
    {/** ACTIONS */}
    <div className="flex gap-x-4 items-center w-44">
      <Link to={`/fxRates/${recId}`} className="text-sky-600"><FaEye /></Link>
      <Link to={`/addRate/${recId}`} className="text-emerald-500"><CiEdit /></Link>
      <button className="text-red-700" onClick={() => handleDelete(recId)}><RiDeleteBin6Line /></button>
    </div>
  </article>
}
export default SingleCurrency