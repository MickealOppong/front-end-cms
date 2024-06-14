import { FaBarsStaggered } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../features/sidebar/sidebarSlice";
import SmallSidebar from "./SmallSidebar";

const SmallSidebarContainer = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const dispatch = useDispatch()

  return <section className={`flex overflow-y-scroll sm:no-scrollbar h-[100vh] lg:hidden bg-white shadow-lg `} >
    <nav className={`flex items-center justify-between h-20 fixed top-0 left-0 w-80  z-50 bg-white`} >
      <h2 className="px-8 text-3xl text-c4 font-bold">pay.co</h2>
      {/** TOGGLE BUTTON */}
      <div className="flex text-3xl text-c4 font- mr-2 " >
        <button onClick={() => dispatch(toggle())}><FaBarsStaggered /></button>
      </div>
    </nav>
    <SmallSidebar />
  </section>


}
export default SmallSidebarContainer;