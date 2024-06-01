import { useSelector } from "react-redux";
import { useNavigate, useRouteError } from "react-router-dom";
import errorImg from '../assets/404.svg';
const ErrorPage = () => {
  const user = useSelector((state) => state.userState.user)
  const navigate = useNavigate();
  const error = useRouteError();

  const redirectUser = () => {
    if (!user) {
      return navigate('/landing')
    }
    return navigate('/')
  }
  if (error.status === 404) {
    return <main className="grid place-items-center mx-auto min-h-[100vh]">
      <div className="text-center">
        <img src={errorImg} alt="" />
        <p className="text-primary my-4 text-lg">Sorry , we could not find the page you are looking for.</p>
        <button onClick={() => redirectUser()} className="btn btn-secondary text-white">Back Home</button>
      </div>
    </main>
  }
  return <main className="flex flex-col items-center mt-60 max-w-md mx-auto">
    <h4 className="text-3xl text-primary">There was an error...</h4>
  </main>


}
export default ErrorPage;