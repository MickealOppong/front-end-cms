import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { customFetch } from "../util";

const SingleAttribute = ({ attributes }) => {
  const token = useSelector((state) => state.userState.token)
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const values = attributes.map((item) => {
    const { id, name, productSKU } = item;
    return {
      id, name, productSKU
    }
  })

  //handles attribute deletion after all children data are deleted
  const { mutate: deleteAttribute } = useMutation({
    mutationFn: (id) => customFetch.delete(`/api/products/attribute/${id}`, {
      params: {
        id
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
    onSuccess: (res) => {
      queryClient.removeQueries(['attributes'])
      navigate('/attributes')
    },
    onError: (err) => {
      console.log(err);
    }
  })


  return <article>
    <div className="w-full  py-4">
      {
        values.map((i, index) => {
          const { id, name, description, productSKU } = i;
          return <div key={id} className={`flex p-4 justify-between  ${index % 2 === 0 ? '' : ''} border-b-[1px]`}>
            <div className="mr-8 w-56 capitalize text-gray-500">
              <p>{name}</p>
            </div>
            <div className="flex gap-x-2 w-[30vw] text-gray-500">
              {
                productSKU.map((item, index) => {
                  const { id, skuValue } = item;
                  return <div key={id} className={`flex gap-x-2 capitalize`}>
                    <p >{index > 0 ? `,${skuValue}` : `${skuValue}`}</p>
                  </div>
                })
              }
            </div>
            <div className="flex gap-x-4 text-xl">
              <Link to={`/viewAttribute/${id}`} className="text-sky-700"><FaEye /></Link>
              <Link to={`/editAttribute/${id}`} className="text-emerald-700"><CiEdit /></Link>
              <button className="text-red-700" onClick={() => deleteAttribute(id)}><RiDeleteBin6Line /></button>
            </div>
          </div>
        })
      }
    </div>
    <div>

    </div>
  </article>
}
export default SingleAttribute