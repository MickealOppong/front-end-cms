import { useSelector } from "react-redux"
import { Form, useLoaderData } from "react-router-dom"
import { FormInputMandate, SectionTitle, SelectInput } from "../components"
import { customFetch } from "../util"
export const action = (store, queryClient) => async ({ request }) => {
  const formData = await request.formData();
  const inputData = Object.fromEntries(formData);
  console.log(inputData);
  const { username, fullname, password, password2, file, role, gender, telephone } = inputData;
  if (password !== password2) {
    console.log("Please enter the same password");
    return null;
  }
  const token = store.getState().userState.token;
  //console.log(data);
  try {
    const response = await customFetch.post('/api/users/user', { username, fullname, password, file, role, gender, telephone },
      {
        headers: {
          "Content-Type": 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
    // console.log(response);
    queryClient.removeQueries(['users'])
    return null;
  } catch (error) {
    console.log(error);
    return null
  }
  return null;
}


const AddUser = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)

  const { roles } = useLoaderData();

  const width = () => {
    return `w-[80vw] lg:w-96`
  }

  return <section className={`mt-24 lg:mt-8 max-w-7xl mx-auto px-8 h-[150dvw]`
  }>
    <div className={`flex `} >
      <SectionTitle title='Add new user' style={'text-black text-xl font-semibold uppercase mb-8 tracking-wider'} />
    </div>
    <div className="flex flex-col gap-y-12">
      <Form method="post" encType="multipart/form-data">
        {/** USER CREDENTIALS */}
        <div className={`flex  flex-col md:grid md:grid-cols-2 bg-white p-8 border-2 `} >
          <div className="flex flex-col gap-y-4 w-full">
            <h2 className="text-gray-700 font-semibold">Account</h2>
            <h4>Fill in the information to add a user</h4>
          </div>
          <div className="flex flex-col gap-y-4 ">
            {/** FULLNAME */}
            <FormInputMandate label='Name' name='fullname' type='text' placeholder='Full name' size={width()} />
            {/** USERNAME */}
            <FormInputMandate label='Email' name='username' type='text' placeholder='Your email' size={width()} />
            {/**TELEPHONE */}
            <FormInputMandate label='Telephone' name='telephone' type='text' placeholder='Your telephone #' size={width()} />

            {/** GENDER */}
            <div className="flex flex-col gap-y-4 w-[30vw]">
              <p className="label-text font-semibold capitalize mb-4 flex items-center">Gender</p>
              <SelectInput name='gender' data={['Male', "Female", "Other"]} size={width()} />
            </div>
            {/** DEFAULT ROLE */}
            <label className="label-text font-semibold capitalize mb-4 flex items-center">Default role</label>
            <select className={`select select-bordered ${width()}`} name="role">
              {
                roles.map((role) => {
                  const { id, roleName } = role;
                  return <option key={id}>{roleName}</option>
                })
              }
            </select>

            {/** PASSWORD */}
            <FormInputMandate label='password' name='password' type='password' placeholder='Enter password' size={width()} />
            {/** CONFIRM PASSWORD */}
            <FormInputMandate label='confirm password' name='password2' type='password' placeholder='Confirm password' size={width()} />
          </div>

        </div>

        {/** USER IMAGE */}
        <div className={`grid grid-cols-2 bg-white p-8 border-2 mt-10 `} >
          <div className="flex flex-col gap-y-4">
            <h2 className="text-gray-700 font-semibold">Photo</h2>
            <h4>You can add image</h4>
          </div>
          <input type="file" className={`file-input file-input-bordered file-input-secondary w-full max-w-xs ${width()}`} name="file" />
        </div>

        <div className={`flex  mt-10`} >
          <button className="btn btn-secondary w-36 text-gray-100">save</button>
        </div>
      </Form>
    </div >
  </section >
}
export default AddUser