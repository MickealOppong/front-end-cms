import { useSelector } from "react-redux";
import { Form, redirect, useLoaderData } from "react-router-dom";
import { CheckboxInput, FormInput } from "../components";
import { customFetch } from "../util";

const editUserQuery = (id, token) => {
  return {
    queryKey: ['user', parseInt(id)],
    queryFn: () => customFetch.get(`/api/users/${id}`, {
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
  const response = await queryClient.fetchQuery(editUserQuery(id, token))
  // console.log(response.data);
  const userInfo = response
    .data;
  return {
    userInfo
  }
}
export const action = (store, queryClient) => async ({ request, params }) => {
  const token = store.getState().userState.token;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { username, fullname, password, file, role, gender, telephone, accountNonExpired, accountNonLocked, credentialsNonExpired, enabled, street, zipCode, image, city } = data
  const { id } = params;
  console.log(data);
  if (data.accountNonExpired === 'on') { data.accountNonExpired = true }
  if (data.accountNonLocked === 'on') { data.accountNonLocked = true }
  if (data.credentialsNonExpired === 'on') { data.credentialsNonExpired = true }
  if (data.enabled === 'on') { data.enabled = true }

  try {
    const response = await customFetch.patch(`/api/users/user/${id}`, { username, fullname, password, file, role, gender, telephone, accountNonExpired, accountNonLocked, credentialsNonExpired, enabled, street, zipCode, image, city }, {
      params: {
        id
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'multipart/form-data'
      }
    })
    console.log(response.data);
    const user = response.data;
    queryClient.removeQueries(['user', id])
    return redirect('/users')
  } catch (error) {
    console.log(error);
    return null;
  }
}
const EditUser = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const token = useSelector((state) => state.userState.token)
  const { userInfo } = useLoaderData();
  const { fullname, username, enabled, accountNonExpired, accountNonLocked, credentialsNonExpired, image, gender, roles, telephone } = userInfo;



  const handleDelete = async (id) => {
    try {
      const response = await customFetch.delete(`/api/roles/${id}`, {
        params: {
          id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return <section className={`mt-8 h-[250vh] ${showSidebar ? 'w-[80vw]' : 'w-[100vw]'} px-8 h-[250vh] `
  }>
    <div className="text-black font-semibold uppercase mb-8 max-w-6xl mx-auto">
      <h2>Edit User details</h2>
    </div>
    <Form className="flex flex-col gap-y-8 max-w-6xl mx-auto mr-8" method="post" encType="multipart/form-data">
      <div className="flex items-start justify-between bg-white p-4 border-2">
        <div className="flex flex-col gap-y-20">
          <h2>Personal information</h2>
        </div>
        <div className="flex flex-col gap-y-4 w-1/2">
          {/** FULL NAME */}
          <FormInput label='Name' defValue={fullname} name='fullname' type='text' />

          {/** USERNAME */}
          <FormInput label='Username' defValue={username} name='username' type='text' />

          {/** GENDER */}
          <FormInput label='Gender' defValue={gender} name='gender' type='text' />
          {/** TELEPHONE */}
          <FormInput label='telephone' defValue={telephone} name='telephone' type='text' />
        </div>

      </div>

      <div className="flex items-start justify-between bg-white p-4 border-2">
        <div>
          <h2>Address information</h2>
        </div>
        <div className="flex flex-col gap-y-4 w-1/2">
          {/** STREET */}
          <FormInput label='street' defValue={userInfo?.addressBook?.street || 'NA'} name='street' type='text' />

          {/** ZIPCODE */}
          <FormInput label='zipCode' defValue={userInfo?.addressBook?.zipCode || 'NA'} name='zipCode' type='text' />

          {/** CITY */}
          <FormInput label='city' defValue={userInfo?.addressBook?.city ?? 'NA'} name='city' type='text' />

          {/** COUNTRY */}
          <FormInput label='country' defValue={userInfo?.addressBook?.country || 'NA'} name='country' type='text' />
        </div>
      </div>
      <div className="flex items-start justify-between bg-white p-4 border-2">
        <div>
          <h2>Account information</h2>
        </div>
        <div className="flex flex-col gap-y-4 w-1/2">
          {/** ACCOUNT ENABLED */}
          <CheckboxInput label='Account Enabled' name='enabled' defCheck={enabled} />

          {/** ACCOUNT NON EXPIRED */}
          <CheckboxInput label='Account Non-Expired' name='accountNonExpired' defCheck={accountNonExpired} />
          {/** ACCOUNT NON LOCKED */}
          <CheckboxInput label='Account Non-Locked' name='accountNonLocked' defCheck={accountNonLocked} />

          {/** ACCOUNT NON EXPIRED */}
          <CheckboxInput label='Credentials Non-Expired' name='credentialsNonExpired' defCheck={credentialsNonExpired} />
        </div>
      </div>

      {/** USER IMAGE */}
      <div className="flex items-start justify-between bg-white p-4 border-2" >
        <div className="flex flex-col gap-y-4">
          <h2 className="text-gray-700 font-semibold">Photo</h2>
          <h4>You can add image</h4>
        </div>
        <div className="w-1/2">
          <input type="file" className={`file-input file-input-bordered file-input-secondary `} name="image" />
        </div>

      </div>
      <div>
        <button className="btn btn-secondary w-36">save</button>
      </div>
    </Form>
  </section>
}
export default EditUser;