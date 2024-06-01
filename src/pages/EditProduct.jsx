import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FormInput, TextArea } from "../components";
import { clear } from "../features/data/selectSlice";
import { customFetch } from "../util/index";
const colours = ['colour', 'color', 'colours', 'colors']

let attributeData = [];
const productQuery = (id, token) => {
  return {
    queryKey: ['product', parseInt(id)],
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


export const loader = (store, queryClient) => async ({ params }) => {
  const token = store.getState().userState.token;
  const { id } = params;
  console.log(id);
  const productResponse = await queryClient.fetchQuery(productQuery(id, token))
  console.log(productResponse);
  const singleProduct = productResponse.data;
  return {
    singleProduct,
  }

}
const EditProduct = () => {
  const [value, setValue] = useState();
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  //
  const { categoryList, attributeList } = useSelector((state) => state.selectState)


  const dispatch = useDispatch();

  const { singleProduct } = useLoaderData();
  let keys = Object.keys(singleProduct.attributes)

  const { id, name, description, images, categories, quantity, regularPrice, salePrice, status, features } = singleProduct.product;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  //
  const token = useSelector((state) => state.userState.token)

  const handleEditProduct = async (e, id) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    formData.append('id', id)
    formData.append('attributes', JSON.stringify(attributeData))
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
      const response = await customFetch.patch(`/api/products/product/${id}`,
        formData, {
        params: {
          id
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'multipart/form-data',
        }
      })
      console.log(response);
      dispatch(clear())
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['product', id] })
      navigate(`/products`)
    } catch (error) {
      console.log(error);
    }
  }

  const width = () => {
    return ` ${showSidebar ? 'lg:w-[25vw]' : 'lg:w-[30vw] '}`
  }




  const handlePriceChange = ({ recId, price }) => {
    const obj = { recId, price }
    const item = attributeData.find((a) => a.recId === recId)
    if (item) {
      item.price = price;
      return;
    }
    attributeData.push(obj)

  }

  const handleQuantityChange = ({ recId, quantity }) => {
    const obj = { recId, quantity }
    const item = attributeData.find((a) => a.recId === recId)
    if (item) {
      item.quantity = quantity;
      return;
    }
    attributeData.push(obj)
  }

  return <section className={`mt-8 h-[400vh] ${showSidebar ? 'w-[80vw]' : 'w-[100vw]'} `
  }>

    <form className={` p-8 ${showSidebar ? 'mr-8' : 'max-w-6xl mx-auto px-16'}`} onSubmit={(e) => handleEditProduct(e, id)} >
      <div className='flex justify-end items-center gap-x-4 max-w-5xl mx-auto mb-10'>
        <button className="btn btn-secondary w-36" >update product</button>
      </div>
      <div className="flex flex-col bg-white p-8 w-[35vw]">
        <div className="text-slate-600  text-sm tracking-wider uppercase bg-slate-200 p-2 mb-4">
          <h2 >General</h2>
        </div>
        <div >
          <FormInput type={'text'} label={'name'} name={'name'} defValue={name} size={'w-[30vw]'} />
        </div>
        <div className="mt-10">
          <TextArea defValue={description} name={'description'} styles='text-slate-500 h-44' />
        </div>
        <div className="mt-10">
          <TextArea defValue={features} name={'features'} styles='text-slate-500 h-44 ' />
        </div>
      </div>
      <div className="flex flex-col bg-white p-8 w-[35vw] absolute top-[14.5%] left-[50%] right-0">
        <div className="text-slate-600 tracking-wider uppercase bg-slate-200 p-2 mb-4 text-sm">
          <h2 >Stock & Pricing</h2>
        </div>
        <div className="flex gap-x-2 text-slate-400">
          <FormInput type={'text'} label={'Stock quantity'} name={'quantity'} defValue={quantity} size={'w-[31vw]'} />
        </div>
        <div className="flex gap-x-2 text-slate-400">
          <FormInput type={'text'} label={'regularPrice'} name={'regularPrice'} defValue={regularPrice} size={'w-[31vw]'} />
        </div>
        <div className="flex gap-x-2 text-slate-400">
          <FormInput type={'text'} label={'salePrice'} name={'salePrice'} defValue={salePrice} size={'w-[31vw]'} />
        </div>

      </div>
      <div className="flex flex-col bg-white p-8 w-[35vw] absolute top-[50%] left-[50%] right-0">
        <div className="text-slate-600 tracking-wider uppercase bg-slate-200 p-2 mb-4 text-sm">
          <h2 >Product variations</h2>
        </div>
        <div className="flex label-text font-semibold capitalize mt-6">
          <p className="w-44 ">attribute</p>
          <p className="w-40 ">quantity</p>
          <p className="w-56">price</p>
        </div>
        <div className="flex flex-col gap-y-2 mt-6">
          {
            keys.map((key) => {
              return singleProduct.attributes[key].map((attribute) => {
                const { recId, description, quantity, price, skuValue } = attribute;
                return <div key={key + id} className="flex text-slate-500 capitalize gap-x-6">
                  <p className="w-44 ">{`${description}-${skuValue}`}</p>
                  <input type="number" defaultValue={quantity} placeholder={quantity
                  } className="w-24 h-10 border-[1px] rounded-md indent-2 focus:outline outline-c4 outline-2 outline-offset-1" onChange={(e) => handleQuantityChange({ recId, quantity: e.target.value })} />
                  <input type="number" defaultValue={price} placeholder={price
                  } className="w-44 h-10 border-[1px] rounded-md indent-2 focus:outline outline-c4 outline-2 outline-offset-1" onChange={(e) => handlePriceChange({ recId, price: e.target.value })} />
                </div>
              })
            })
          }
        </div>
      </div>
    </form>
  </section >
}

export default EditProduct