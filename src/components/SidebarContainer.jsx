import { useSelector } from "react-redux";
import { Sidebar } from "./index";
const SidebarContainer = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)

  return <section className={`flex flex-col  overflow-y-scroll sm:no-scrollbar h-[100vh]`}>
    <nav className={`flex items-center h-20 absolute top-0 left-0 right-56 z-40 bg-white`} >
      <h2 className=" px-8 text-3xl text-c4 font-bold">pay.co</h2>
    </nav>
    <Sidebar />
  </section>
}
export default SidebarContainer;