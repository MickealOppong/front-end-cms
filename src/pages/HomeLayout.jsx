import { useSelector } from "react-redux";
import { Outlet, useNavigation } from "react-router-dom";
import { Loading, Navbar, SidebarContainer, SmallSidebarContainer } from "../components/index";
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

  return <main className="flex">
    <div className={`${showSidebar ? 'fixed top-0' : 'hidden'} duration-300 h-full  overflow-y-scroll no-scrollbar`}>
      <SidebarContainer />
    </div>
    <div className={`absolute top-0 z-50 bg-white ${showSidebar ? 'translate-0' : '-translate-x-full '} duration-300`}>
      <SmallSidebarContainer />
    </div>
    <div className={`flex flex-col lg:fixed 
     min-h-[100vh]
   lg:top-0 ${showSidebar ? 'lg:left-80 lg:w-[80vw]' : 'lg:left-0 lg:w-full'} duration-300 lg:right-0 border-r-2 w-full`} >
      <Navbar />
      <div className={`flex bg-slate-100 sticky top-20 h-[100vh] overflow-y-scroll no-scrollbar`}>{
        isLoading ?
          <Loading /> : <Outlet />
      }
      </div>
    </div>
  </main>
}
export default HomeLayout;