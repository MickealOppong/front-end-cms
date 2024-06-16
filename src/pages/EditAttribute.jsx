import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { customFetch } from "../util";

const array = [];
const editAttributeQuery = (id, token) => {
  return {
    queryKey: ['editAttribute', id],
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
  const response = await queryClient.fetchQuery(editAttributeQuery(id, token));
  const attributeData = response.data;
  return {
    attributeData
  }

}

export const action = (store, queryClient) => async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  console.log(array);
  return null;
}
const EditAttribute = () => {

  const { attributeData } = useLoaderData();
  const { id, name, productSKU } = attributeData;
  const [visible, setVisible] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const token = useSelector((state) => state.userState.token)
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const array = ['colour', 'color', 'colours', 'colors']

  const { mutate: addAttribute } = useMutation({
    mutationFn: (data) => customFetch.post('/api/products/attribute', JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attributes'] })
      queryClient.invalidateQueries({ queryKey: ['editAttribute'] })
      setVisible(!visible)
      navigate(`/editAttribute/${id}`)
    },
    onError: (error) => {
      console.log(error);
    }
  })

  const updateAttribute = async (id, data) => {
    try {
      const response = await customFetch.patch(`/api/products/attribute/${id}`, JSON.stringify(data), {
        params: {
          id
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'application/json'
        }
      })
      queryClient.invalidateQueries({ queryKey: ['attributes'] })
      queryClient.invalidateQueries({ queryKey: ['editAttribute'] })
      navigate(`/editAttribute/${id}`)
      setReadOnly(!readOnly)
    } catch (error) {
      console.log(error); xs
    }
  }

  const { mutate: deleteSku } = useMutation({
    mutationFn: (id) => customFetch.delete(`/api/products/sku/${id}`, {
      params: {
        id
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attributes'] })
      queryClient.invalidateQueries({ queryKey: ['editAttribute'] })
      setVisible(!visible)
      navigate(`/editAttribute/${id}`)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    formData.append
      ('name', name)
    const data = Object.fromEntries(formData);
    console.log(data);
    addAttribute(data)
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData);
    updateAttribute(id, data)
    setReadOnly(true)
  }
  const handleDelete = (e, id) => {
    e.preventDefault();
    console.log(id);
    deleteSku(id)
  }

  const handleEdit = (e) => {
    e.preventDefault();
    setReadOnly(!readOnly)
  }

  return <section className={`mt-24 lg:mt-8 h-[250vh] px-8 max-w-6xl mx-auto`
  }>
    <div className={`text-black font-semibold uppercase mb-8`}>
      <h2>Attribute information</h2>
    </div>
    <div className="flex flex-col  bg-white w-full">
      {/** NAME */}
      <div className="lex flex-col gap-y-8 mr-10 p-8 w-full ">
        <p>{name}</p>
        <div className="mt-10 flex flex-col gap-y-4 w-full">
          {
            productSKU.map((sku) => {
              const { id, description, skuValue, quantity, price } = sku;
              return <form className="flex flex-col gap-y-2 border-2 rounded-md shadow-md p-4 " method="post" key={id} onSubmit={(e) => handleUpdate(e, id)}>
                <div className="grid grid-cols-2 p-2 gap-y-2 text-xs">
                  <input name={'description'} placeholder="description" className={`capitalize outline-none w-60 ${readOnly ? '' : 'border-2 p-2 rounded-md'}`} defaultValue={description} readOnly={readOnly} />
                  <input name={'value'} placeholder="value" className={`capitalize outline-none w-60 ${readOnly ? '' : 'border-2 p-2 rounded-md'}`} defaultValue={skuValue} readOnly={readOnly} />
                </div>
                <div className="mt-2 flex gap-x-4 w-full">
                  <button onClick={(e) => handleEdit(e)}><CiEdit /></button>
                  <button onClick={(e) => handleDelete(e, id)}><RiDeleteBin5Line /></button>
                  <button>save</button>
                </div>
              </form>
            })
          }
        </div>

        <div>
          {
            visible ? <form className="flex flex-col gap-y-2 border-2 rounded-md shadow-md p-4 mt-4 text-sm" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 p-2 gap-y-2">
                <input name={'description'} placeholder="description" className="capitalize outline-none w-56" />
                <input name={'value'} placeholder="value" className="capitalize outline-none w-56" />
              </div>
              <div className="mt-2 flex gap-x-4">
                <button className="bg-c4 h-8 rounded-md text-slate-50 w-24">add</button>
                <button className="bg-c4 h-8 rounded-md text-slate-50 w-24" onClick={() => setVisible(!visible)}>cancel </button>
              </div>
            </form> : <div className="flex mt-10">
              <button className="btn btn-secondary" onClick={() => setVisible(!visible)}>add Sku</button>
            </div >
          }
        </div>

      </div>

    </div>
  </section>
}
export default EditAttribute;