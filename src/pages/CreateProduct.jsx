import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AddCategory, AddVariant, FormInput, FormInputMandate, SimpleSelect, TextArea } from "../components/index";
import { clear } from "../features/data/selectSlice";
import { customFetch } from "../util";
//form data for storing array of images
const images = new FormData()
let imageData = [];

const dataQuery = (url, token) => {
  return {
    queryKey: ['all'],
    queryFn: () => customFetch.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}

export const loader = (store, queryClient) => async () => {
  const token = store.getState().userState.token;

  const responseA = await customFetch.get('/api/products/categoryList', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const responseB = await customFetch.get('/api/products/attributeList', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const responseC = await customFetch.get('/api/vendors', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  //console.log(response.data);
  const response = await axios.all([responseA, responseB, responseC]).then((res) => {
    return res;
  }).catch((er) => console.log(er))

  const categoryData = response[0]?.data;
  const attributeData = response[1]?.data;
  const vendors = response[2]?.data;
  return {
    categoryData,
    attributeData,
    vendors
  }
}


const CreateProduct = () => {
  const [showForm, setShowForm] = useState();
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const { categoryData, attributeData, vendors } = useLoaderData();
  //
  const catData = categoryData.map((category) => category.name);

  //
  const { categoryList, attributeList } = useSelector((state) => state.selectState)
  //
  const token = useSelector((state) => state.userState.token)
  //
  const queryClient = useQueryClient();
  const dispatch = useDispatch()
  const navigate = useNavigate();

  //
  const width = () => {
    return ` ${showSidebar ? 'lg:w-[25vw]' : 'lg:w-[30vw] '}`
  }


  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    formData.append('files', JSON.stringify(imageData))
    formData.append('attributes', JSON.stringify(attributeList))
    formData.append('categories', JSON.stringify(categoryList))
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
      const response = await customFetch.post(`/api/products/product`,
        formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'multipart/form-data',
        }
      })

      dispatch(clear())
      queryClient.invalidateQueries({ queryKey: ['products'] })
      navigate('/products')
    } catch (error) {
      console.log(error);
    }
  }


  return <section className={`mt-8 w-full px-16 h-[300vh] `
  }>

    <div className='max-w-6xl mx-auto'>
      <div className="max-w-6xl mx-auto text-xl" >
        <h2>Add product</h2>
      </div>
      <form encType="multipart/form-data" method="post" onSubmit={handleCreateProduct} >
        <div className="flex justify-end mb-10 mr-10">
          <button className="btn btn-secondary w-36 hover:bg-c3">Add product</button>
        </div>

        <div className="flex flex-col w-[40vw] gap-y-8">
          <div className="flex bg-white gap-x-4 ">
            {/**PRODUCT META DATA */}
            <div className="flex flex-col p-8">
              <div className="text-slate-600 tracking-wider uppercase bg-slate-200 p-2 mb-4">
                <h2 >General</h2>
              </div>
              <div className="flex flex-col gap-y-4">
                {/**NAME */}
                <FormInputMandate label='name' name='name' type='text' placeholder='Enter product name' size={'w-[35vw]'} />

                {/**DESCRIPTION */}
                <TextArea name='description' placeholder='Description' styles={'w-[35vw] h-24'} />

                {/**FEATURES*/}
                <TextArea name='features' placeholder='Features' styles={'w-[35vw] h-24'} />
              </div>

            </div>
          </div>
          {/** STOCK AND PRICE DATA */}
          <div className="flex flex-col bg-white p-8">
            <div className="text-slate-600 tracking-wider uppercase bg-slate-200 p-2 mb-4">
              <h2 >Stock & Pricing information</h2>
            </div>
            <div className="flex flex-col gap-y-4" >
              {/** QUANTITY */}
              <FormInputMandate label='Available quantity' name='quantity' type='text' placeholder='Enter quantity' size={'w-[35vw]'} />

              {/** SELLING PRICE */}
              <FormInputMandate label='Purchase Cost' name='purchasePrice' type='text' placeholder='Enter cost price' size={'w-[35vw]'} />

              {/** SELLING PRICE */}
              <FormInputMandate label='regular Price' name='regularPrice' type='text' placeholder='Enter regular price' size={'w-[35vw]'} />

              <FormInput label='Discounted Price' name='salePrice' type='text' placeholder='Enter discounted price' size={'w-[35vw]'} />
            </div>
          </div>
        </div>
        <div className={`flex flex-col gap-y-8 absolute top-40  ${showSidebar ? "w-80 right-60" : 'w-96 right-80'}`}>
          {/**IMAGE */}
          <div className="flex flex-col gap-y-4  bg-white w-[35vw] p-8">
            <div className="text-slate-600 tracking-wider uppercase bg-slate-200 p-2 mb-4">
              <h2 >Product images</h2>
            </div>
            <div>
              <input name='files' type='file' className={`file-input file-input-bordered file-input-secondary w-full h-24 `} multiple onChange={(e) => {

                for (let i = 0; i < e.target.files.length; i++) {
                  imageData.push(e.target.files[i])
                }
              }} />
            </div>
          </div>

          {/**ATTRIBUTES AND CATEGORY */}
          <div className="flex flex-col gap-y-4 bg-white p-8 w-[35vw]">
            <div className="text-slate-600 tracking-wider uppercase bg-slate-200 p-2 mb-4">
              <h2 >attribute and category</h2>
            </div>
            <div className="flex flex-col gap-y-10">
              <AddCategory categories={catData} />
              <AddVariant data={attributeData} />
            </div>
          </div>
        </div>
        {/** VENDOR DETAILS */}
        <div className="w-[40vw] bg-white p-8 mt-10">
          <div className="text-slate-600 tracking-wider uppercase bg-slate-200 p-2 mb-4">
            <h2 >Supplier information</h2>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-4">
              <p className="label-text font-semibold">Supplier</p>
              <SimpleSelect data={vendors} name={'vendor'} size={'w-40vw'} />
            </div>
            <FormInput label='Invoice#' name='invoiceId' type='text' placeholder='Enter invoice #' size={'w-[31vw]'} />
            <button type="button" onClick={() => setShowForm(true)} className="btn btn-secondary ">add new supplier</button>
          </div>

          <div className={`${showForm ? 'flex' : 'hidden'}`}>
            <div className="flex flex-col gap-y-4">
              <FormInput label={'Vendor name'} name='vendorName' type='text' placeholder={'Vendor name'} size={'w-[31vw]'} />
              <FormInput label={'Address'} name='vendorAddress' type='text' placeholder={'Address'} size={'w-[31vw]'} />
              <FormInput label={'Telephone'} name='vendorTelephone' type='text' placeholder={'Telephone'} size={'w-[31vw]'} />
              <FormInput label={'Email'} name='vendorEmail' type='email' placeholder={'Email'} size={'w-[31vw]'} />

              <button type="button" className="btn w-24" onClick={() => setShowForm(false)}>hide</button>
            </div>

          </div>

        </div>
      </form>
    </div>
  </section >
}
export default CreateProduct;