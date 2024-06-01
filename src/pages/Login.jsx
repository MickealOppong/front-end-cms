import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { loginUser } from "../features/user/userSlice";
import { customFetch } from "../util";

export const action = (store) => async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  //console.log(username, password);
  try {
    const response = await customFetch.post('/api/auth/login', JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json"
      }
    })
    //console.log(response);
    const user = response.data.appUser;
    const token = response.data.accessToken;
    const refreshToken = response.data.token;
    store.dispatch(loginUser({ user, token }))
    localStorage.setItem('jwt', refreshToken);
    return redirect('/')
  } catch (error) {
    if (error.response.status == 401) {
      return redirect('')
    }
    return null;
  }
}
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();


  const loginGuestUser = async () => {
    const data = {
      username: 'demo@mail.com',
      password: 'demo-user'
    }
    try {
      const response = await customFetch.post('/api/auth/login', JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json"
        }
      })
      const user = response.data.appUser;
      const token = response.data.accessToken;
      const refreshToken = response.data.token;
      dispatch(loginUser({ user, token }))
      localStorage.setItem('jwt', refreshToken);
      navigate('/')
    } catch (error) {

    }
  }
  return <section className="max-w-md mx-auto mt-36  border-2 p-12">
    <div className="flex flex-col items-center gap-y-4 text-3xl mb-12 uppercase">
      <h2 className="text-base tracking-wider">login</h2>
    </div>
    <Form className="form-control flex flex-col gap-y-8" method="post">
      <label className="input input-bordered flex items-center gap-2">
        <CiUser />
        <input type="text" className="grow h-8 caret-c-3 outline-none" placeholder="Email" name="username" />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <RiLockPasswordLine />
        <input type="password" className="grow h-8 outline-none" placeholder="Password" name="password" />
      </label>
      <div>
        <button className="bg-primary text-gray-300 w-full h-12 uppercase rounded-md " >
          login
        </button>
      </div>
    </Form>
    <div className="mt-4">
      <button className="bg-secondary text-gray-300 w-full h-12 uppercase rounded-md" onClick={() => loginGuestUser()}>login as guest</button>
    </div>
    <div className="flex gap-x-1 mt-6">
      <p className="text-accent">Not yet registered?</p>
      <Link to='/register' className="text-secondary font-semibold hover:underline">Register</Link>
    </div>
  </section>
}
export default Login;