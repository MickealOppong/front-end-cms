import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { customFetch } from "../util";

const SingleRate = ({ recId, date, fxRate }) => {
  const token = useSelector((state) => state.userState.token)
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const { mutate: deleteRate } = useMutation({
    mutationFn: (recId) => customFetch.delete(`/api/currency/${recId}`, {
      params: {
        id: recId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
    onSuccess: (res) => {
      queryClient.removeQueries(['currency'])
      navigate(`/currencies`)
    },
    onError: (err) => {
      console.log(err);
    }
  })

  const handleDelete = (recId) => {
    console.log(recId);
    deleteRate(recId)
  }

  return <div className="flex">
    {/**DATE OF RATE*/}
    <div className="flex items-center">
      <p className="w-[10rem] md:w-60 lg:w-80">{new Date(date).toDateString()}</p>
    </div>
    {/**RATE */}
    <div className="w-[8rem] md:w-60 lg:w-96">
      <p >{fxRate.toFixed(4)}</p>
    </div>
    {/** ACTIONS */}
    <div className="flex gap-x-4 items-center w-8">
      <button className="text-red-700" onClick={() => handleDelete(recId)}><RiDeleteBin6Fill /></button>
    </div>
  </div>
}
export default SingleRate