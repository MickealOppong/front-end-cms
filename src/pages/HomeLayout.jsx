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

  return <main className={`flex `}>
    <div className={`${showSidebar ? 'w-80 ' : 'w-0 '} duration-300`}>
      <div className={` hidden lg:flex overflow-y-scroll no-scrollbar  `}>
        <SidebarContainer />
      </div>
    </div>
    <div className={`lg:hidden ${showSidebar ? 'inline-block' : 'hidden'} duration-300 overflow-y-scroll no-scrollbar 
    `}>
      <SmallSidebarContainer />
    </div>
    <div className={`flex flex-col w-[100vw] `} >
      <Navbar />
      <div className={`flex bg-slate-100 min-h-[100vh] max-h-[1170px] sticky top-20  overflow-y-scroll no-scrollbar`}>{
        isLoading ?
          <Loading /> : <Outlet />
      }
      </div>
    </div>
  </main>
}
export default HomeLayout;