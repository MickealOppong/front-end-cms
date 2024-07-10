import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { customFetch } from "../util";
import DefaultImage from "./DefaultImage";
const User = ({ id, fullname, username, image, telephone }) => {
  const token = useSelector((state) => state.userState.token)
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deleteUser } = useMutation({
    mutationFn: (id) => customFetch.delete(`/api/users/${id}`, {
      params: {
        id
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
    onSuccess: () => {
      queryClient.removeQueries(['users'])
      navigate('/users')
    },
    onError: () => {

    }
  })

  return <div>

    <div className="flex justify-between items-center text-sm w-[100vw] p-2 ">
      <div className="ml-2 w-36">
        <p>{id}</p>
      </div>
      <div className="flex  w-96 gap-x-4">
        {
          image ? <img src={image} className="w-12 h-12 rounded-xl" /> : <DefaultImage name={fullname} size={'w-12 h-12'} />
        }

        <div className="flex flex-col gap-y-[1px]">
          <p className="capitalize">{fullname}</p>
          <p className="text-slate-500">Manager</p>
        </div>
      </div>
      <div className="w-96">
        <p className="ml-6">{username}</p>
      </div>
      <div className="w-96">
        <p>{telephone}</p>
      </div>
      {/** ACTIONS */}
      <div className="flex w-80 gap-x-4 ">
        <Link to={`/viewUser/${id}`} className="text-sky-600" ><FaEye /></Link>
        <Link to={`/editUser/${id}`} className="text-emerald-500 link link-primary" ><CiEdit /></Link>
        <button className="text-red-700" onClick={() => deleteUser(id)}><RiDeleteBin6Line /></button>
      </div>
    </div>
  </div>
}
export default User;