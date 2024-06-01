
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
  return <section className={`flex flex-col items-center mt-8 h-[100vh] ${showSidebar ? 'w-[80vw]' : 'w-[100vw]'} px-8 `
  }>
    <div className="text-black font-semibold uppercase mb-8 w-[60vw]">
      <h2>create Currency</h2>
    </div>

    <Form method="post" className="flex flex-col bg-white p-16 gap-y-8 border-2 w-[60vw] " encType="multipart/form-data" >
      {/**CATEGORY NAME */}
      <FormInputMandate label='Currency Name' name='currency' type='text' placeholder='Enter currency name' size={'w-[50vw]'} />
      {/**CATEGORY DESCRIPTION */}
      <FormInputMandate label='Currency ISO' name='iso' type='text' placeholder='Enter currency name' size={'w-[50vw]'} />
      <div>
        <button className="btn btn-secondary w-36">save</button>
      </div>
    </Form>
  </section>
}
export default CreateCurrency