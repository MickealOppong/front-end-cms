import { useSelector } from "react-redux";
import { Outlet, useNavigation } from "react-router-dom";
import { Loading, Navbar, SidebarContainer, SmallSidebar } from "../components/index";
export const loader = (store) => () => {
  const user = store.getState().userState.user;
  if (!user) {
    return redirect("/landing")
  }
  return null;
}

const HomeLayout = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const navigation = useNavigation();
  const isLoading = navigation.state === 'submitting'

  return <main className={`flex `}>
    <div className={`${showSidebar ? 'w-80' : 'w-0'} duration-300`}>
      <div className={` hidden lg:flex overflow-y-scroll no-scrollbar  `}>
        <SidebarContainer />
      </div>
      <div className="lg:hidden absolute top-0 left-0
       z-[100]">
        <SmallSidebar />
      </div>
    </div>

    <div className={` flex flex-col w-full`} >
      <Navbar />
      <div className={`flex bg-green-100  min-h-[100vh] max-h-[1170px] sticky top-20  overflow-y-scroll no-scrollbar`}>{
        isLoading ?
          <Loading /> : <Outlet />
      }
      </div>
    </div>
  </main>
}
export default HomeLayout;