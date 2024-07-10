import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { customFetch } from "../util";
const SingleCurrency = ({ recId, currency, iso, createdAt }) => {
  const token = useSelector((state) => state.userState.token)
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteCurrency } = useMutation({
    mutationKey: ['categories'],
    mutationFn: (recId) => customFetch.delete(`/api/currency/delete`, {
      params: {
        recId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
    onSuccess: () => {
      //queryClient.removeQueries(['categories'])
      queryClient.removeQueries(['currencies'])
      return navigate('/currencies')
    },
    onError: (err) => {

    }

  })
  return <article className="flex capitalize text-slate-600 text-sm" >
    {/**NAME */}
    <div className="flex  items-center w-96 md:w-96 lg:w-96">
      <p >{currency}</p>
    </div>
    {/**DESCRIPTION */}
    <div className="hidden md:flex items-center md:w-96 lg:w-56">
      <p >{iso}</p>
    </div>
    {/**CREATE AT */}
    <div className="hidden lg:flex items-center w-80">
      <p className="">{new Date(createdAt).toDateString()}</p>
    </div>
    {/** ACTIONS */}
    <div className="flex gap-x-4 items-center ">
      <Link to={`/fxRates/${recId}`} className="text-sky-600"><FaEye /></Link>
      <Link to={`/addRate/${recId}`} className="text-emerald-500"><CiEdit /></Link>
      <button className="text-red-700" onClick={() => deleteCurrency(recId)}><RiDeleteBin6Line /></button>
    </div>
  </article>
}
export default SingleCurrency