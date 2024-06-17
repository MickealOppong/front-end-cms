import { useSelector } from "react-redux";
import { Form, redirect, useLoaderData } from "react-router-dom";
import { FormInput } from "../components/index";
import { customFetch } from "../util";
const categoryQuery = (id, token) => {
  return {
    queryKey: ['category', parseInt(id)],
    queryFn: () => customFetch.get(`/api/products/categories/${id}`, {
      params: {
        id
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

}

const updateCategory = async (id, token, data) => {
  try {
    const response = await customFetch.patch(`/api/products/categories/${id}`, JSON.stringify(data), {
      params: {
        id
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      }
    })
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const loader = (store, queryClient) => async ({ params }) => {
  const token = store.getState().userState.token;
  const { id } = params;
  const response = await queryClient.ensureQueryData(categoryQuery(id, token))
  //console.log(response);
  const category = response.data;
  return {
    category
  }
}

export const action = (store, queryClient) => async ({ request, params }) => {

  const token = store.getState().userState.token;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { id } = params;
  const response = await updateCategory(id, token, data);
  console.log(response);
  //queryClient.setQueryData(['category', id], response)
  queryClient.invalidateQueries({ queryKey: ['categories'] })
  return redirect('/categories')
}
const EditCategory = () => {

  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const { category } = useLoaderData();
  const { token } = useSelector((state) => state.userState.token)
  const { id, name, description, quantity, sale } = category;


  return <section className={`mt-24 lg:mt-8 h-[150vh] w-full px-8 max-w-5xl mx-auto`
  }>
    <div className="text-black font-semibold uppercase mb-8">
      <h2>Edit Category details</h2>
    </div>
    <Form method="post" className="flex flex-col gap-y-8 ">
      <div className="flex flex-col lg:flex-row gap-y-4 items-start justify-between bg-white p-4">
        <div className="flex flex-col">
          <h2>Category information</h2>
        </div>
        <div className="flex flex-col gap-y-4 w-full lg:w-1/2">
          {/**NAME */}
          <FormInput label='Name' defValue={name} name='name' type='text' />

          {/**DESCRIPTION */}
          <FormInput label='description' defValue={description} name='description' type='text' />

          {/** QUANTITY*/}
          <FormInput label='quantity' defValue={quantity} name='quantity' type='text' />

          {/** SALE*/}
          <FormInput label='sale' defValue={sale} name='sale' type='text' />
        </div>
      </div>
      <div>
        <button className="btn btn-secondary w-36">save changes</button>
      </div>
    </Form>
  </section>
}
export default EditCategory;