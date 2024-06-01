import { useMutation } from "@tanstack/react-query";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { customFetch } from "../util";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData)

    console.log(userData);
    createUser(userData)
  }

  const { mutate: createUser } = useMutation({
    mutationFn: ({ username, fullname, password }) => customFetch.post('/api/auth/register', { username, fullname, password }, {
      headers: {
        "Content-Type": 'multipart/form-data'
      }
    }),
    onSuccess: () => {
      navigate('/login')
    },
    onError: (error) => {
      console.log(error);
    }
  })
  return <section className="max-w-md mx-auto mt-36  border-2 p-12">
    <div className="text-3xl mb-12 uppercase">
      <h2 className="text-base">Sign up</h2>
    </div>
    <form className="form-control flex flex-col gap-y-8" method="post" onSubmit={handleRegister}>
      <label className="input input-bordered flex items-center gap-2">
        <CiUser />
        <input type="text" className="grow h-8 caret-accent outline-none" placeholder="name" name="fullname" />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <CiUser />
        <input type="text" className="grow h-8 caret-accent outline-none" placeholder="Email" name="username" />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <RiLockPasswordLine />
        <input type="password" className="grow h-8 outline-none" placeholder="Password" name="password" />
      </label>
      <div>
        <button className="bg-primary text-gray-300 w-full h-12 uppercase rounded-md ">Submit</button>
      </div>
    </form>
    <div className="flex gap-x-1 mt-6">
      <p className="text-accent">Already have an Account?</p>
      <Link to='/login' className="text-secondary font-semibold hover:underline">Login</Link>
    </div>
  </section>
}
export default Register;