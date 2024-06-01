import { useSelector } from "react-redux"
import { Form, redirect } from "react-router-dom"
import { FormInputMandate } from "../components/index"
import { customFetch } from "../util"


export const action = (store, queryClient) => async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const token = store.getState().userState.token;
  console.log(data);
  try {
    const response = await customFetch.post('/api/products/attribute', JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      }
    })
    queryClient.removeQueries(['attributes'])
    return redirect('/attributes')
  } catch (error) {
    console.log(error);
    return null;
  }

}

const CreateAttribute = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)

  const width = () => {
    return ` ${showSidebar ? 'lg:w-[50vw]' : 'lg:w-[50vw] '}`
  }
  return <section className={`flex flex-col items-center mt-8 ${showSidebar ? 'w-[80vw]' : 'w-[100vw]'} px-8 h-[200vh]`
  }>
    <div className="flex w-[60vw] tracking-wider mr-8 text-black font-semibold uppercase mb-8">
      <h2>create attributes</h2>
    </div>

    <Form className="flex flex-col bg-white p-16 gap-y-8 border-[1px] mr-8 w-[60vw]" method="post">
      {/**ATTRIBUTE NAME */}
      <FormInputMandate label='Attribute name' name='name' type='text' placeholder='Enter category type' size={width()} />

      {/**ATTRIBUTE DESCRIPTION */}
      <FormInputMandate label='Attribute description' name='description' type='text' placeholder='Enter description' size={width()} />

      {/**ATTRIBUTE VALUE */}
      <FormInputMandate label='Attribute value' name='value' type='text' placeholder='Enter attribute name' size={width()} />
      <div>
        <button className="btn btn-secondary w-36">save</button>
      </div>
    </Form>
  </section>
}
export default CreateAttribute;