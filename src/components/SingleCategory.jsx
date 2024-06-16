import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { customFetch } from "../util";


const SingleCategory = ({ id, name, description, quantity, sale, createdAt, icon }) => {
  const token = useSelector((state) => state.userState.token)
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: handleDelete } = useMutation({
    mutationKey: ['categories'],
    mutationFn: (id) => customFetch.delete(`/api/products/category/${id}`, {
      params: {
        id
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

  return <article className="flex  w-[100vw] capitalize text-slate-600" key={id}>
    {/**NAME */}
    <div className="flex  items-center w-60">
      <p >{name}</p>
    </div>
    {/**DESCRIPTION */}
    <div className="hidden md:flex items-center w-96">
      <p >{description}</p>
    </div>
    {/**QUANTITY */}
    <div className="hidden lg:flex items-center w-36">
      <p >{quantity}</p>
    </div>
    {/**SALE */}
    <div className="hidden lg:flex items-center w-36 ">
      <p >{sale}</p>
    </div>
    {/**CREATE AT */}
    <div className="hidden lg:flex items-center w-80">
      <p className="">{new Date(createdAt).toDateString()}</p>
    </div>
    {/** ACTIONS */}
    <div className="flex gap-x-4 items-center w-44">
      <Link to={`/viewCategory/${id}`} className="text-sky-600"><FaEye /></Link>
      <Link to={`/editCategory/${id}`} className="text-emerald-500"><CiEdit /></Link>
      <button className="text-red-700" onClick={() => handleDelete(id)}><RiDeleteBin6Line /></button>
    </div>
  </article>

}
export default SingleCategory;