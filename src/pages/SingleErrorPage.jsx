
import { useSelector } from "react-redux";
import { useNavigate, useRouteError } from "react-router-dom";

const SingleErrorPage = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)

  const navigate = useNavigate();
  const error = useRouteError();
  console.log(error);
  if (error?.response?.status === 401) {
    return navigate('/')
  }
  return <section className={`mt-8 ${showSidebar ? 'w-[80vw]' : 'w-[100vw]'} px-8 h-[200vh] `
  }>
    <h2>{error?.message}</h2>
  </section>
}
export default SingleErrorPage;