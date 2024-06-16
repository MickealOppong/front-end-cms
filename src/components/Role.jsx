import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { customFetch } from "../util";
const Role = ({ id, roleName, createdAt }) => {
  const token = useSelector((state) => state.userState.token)
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteRole } = useMutation({
    mutationFn: (id) => customFetch.delete(`/api/roles/${id}`, {
      params: {
        id
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      navigate('/roles')
    },
    onError: (error) => {
      console.log(error);
    }
  })

  const handleDelete = async (id) => {
    deleteRole(id)
  }


  return <div className="flex capitalize w-full  p-4">
    {/** ID */}
    <div className="w-1/2">
      <p>{id}</p>
    </div>
    {/** NAME */}
    <div className="w-1/2" >
      <p>{roleName}</p>
    </div>
    {/** CREATED AT */}
    <div className="hidden md:flex w-1/2" >
      <p>{new Date(createdAt).toDateString()}</p>
    </div>
    {/** ACTIONS */}
    <div className="flex w-1/2 gap-x-4 items-center">
      <Link to={`/viewRole/${id}`} className="text-sky-600" ><FaEye /></Link>
      <Link to={`/editRole/${id}`} className="hidden text-emerald-500 link link-primary" ><CiEdit /></Link>
      <button className="text-red-700" onClick={() => handleDelete(id)} ><RiDeleteBin6Line /></button>
    </div>
  </div>
}
export default Role;