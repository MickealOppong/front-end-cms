
import { useSelector } from "react-redux";
import { Form, redirect } from "react-router-dom";
import { FormInputMandate } from "../components/index";
import { customFetch } from "../util";

export const action = (store, queryClient) => async ({ request }) => {
  const token = store.getState().userState.token;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    let response = await customFetch.post('/api/currency/currency', JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${token}`,

        "Content-Type": 'application/json'
      }
    })
    queryClient.removeQueries(['currencies'])
    return redirect('/currencies')
  } catch (error) {
    console.log(error);
    return null
  }
}
const CreateCurrency = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  return <section className={`flex flex-col items-center mt-28 lg:mt-8 px-4  md:px-16 h-[100vh] w-full max-w-6xl mx-auto `
  }>
    <div className="flex w-full 
     text-black font-semibold uppercase mb-8 ">
      <h2>create Currency</h2>
    </div>
    <Form method="post" className="flex flex-col gap-8 bg-white border-2 w-full py-4 px-6 md:px-16 lg:px-24" encType="multipart/form-data" >

      {/**CATEGORY NAME */}
      <FormInputMandate label='Currency Name' name='currency' type='text' placeholder='Enter currency name' size={'w-[80vw] md:w-[70vw] lg:w-[60vw]'} />

      {/**CATEGORY DESCRIPTION */}
      <FormInputMandate label='Currency ISO' name='iso' type='text' placeholder='Enter currency name' size={'w-[80vw] md:w-[70vw] lg:w-[60vw]'} />
      <div className="flex items-start">
        <button className="btn btn-secondary w-36">save</button>
      </div>
    </Form>

  </section>
}
export default CreateCurrency