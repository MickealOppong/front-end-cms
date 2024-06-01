import { useSelector } from "react-redux";
import { Form, redirect } from "react-router-dom";
import { FormInputMandate } from "../components/index";
import { customFetch } from "../util";

export const action = (store, queryClient) => async ({ request, params }) => {
  const { id } = await params
  const formData = await request.formData();
  const { date, rate } = Object.fromEntries(formData);
  const token = store.getState().userState.token;
  console.log(date, rate);
  try {
    const response = await customFetch.post(`/api/currency/fx/${id}`, { date, rate }, {
      params: {
        id
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'multipart/form-data'
      }
    })
    //console.log(response.data);
    queryClient.removeQueries(['currencies'])
    return redirect('/currencies')
  } catch (error) {
    console.log(error);
    return null;
  }

}
const AddRate = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)

  return <div className={`flex flex-col items-center mt-8 h-[65vh] ${showSidebar ? 'w-[80vw]' : 'w-[100vw]'} px-8 `
  }>
    <div className="text-black font-semibold uppercase mb-8 w-[60vw]">
      <h2>add fx rates</h2>
    </div>
    <Form method="post" className="flex flex-col bg-white p-16 gap-y-8 border-2 w-[60vw] " encType="multipart/form-data" >
      {/**CURRENCY DATE */}
      <FormInputMandate label='Date' name='date' type='date' placeholder='Enter currency date' size={'w-[50vw]'} />
      {/**FX RATE */}
      <FormInputMandate label='Fx rate' name='rate' type='text' placeholder='Enter fx rate' size={'w-[50vw]'} />
      {/**CATEGORY DESCRIPTION */}
      <div>
        <button className="btn btn-secondary w-36" >save</button>
      </div>
    </Form>
  </div>
}
export default AddRate