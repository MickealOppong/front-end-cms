import { Form } from "react-router-dom";
import { FormInput } from "../components";
import { customFetch } from "../util";
export const action = (store) => async ({ request }) => {

  const id = store.getState().userState.user.id;
  const token = store.getState().userState.token;
  const formData = await request.formData();
  formData.append('id', id)
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    const response = await customFetch.postForm(`/api/photos`, data, {
      headers: {
        "Content-Type": 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },

    })
    console.log(response);
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }

}
const Profile = () => {

  return <section>
    {/**USER INFO */}
    <div>

    </div>
    {/** UPLOAD IMAGE */}
    <div>
      <Form method="post" encType="multipart/form-data">
        <FormInput type='file' label='Image' name='file' />
        <button className="btn btn-secondary">submit</button>
      </Form>
    </div>

  </section>
}
export default Profile;