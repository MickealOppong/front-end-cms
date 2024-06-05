import { FaBarsStaggered } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../features/sidebar/sidebarSlice";
import SmallSidebar from "./SmallSidebar";

const SmallSidebarContainer = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const dispatch = useDispatch()

  return <section className={`absolute top-0 bottom-0 left-0 z-[101] bg-white h-[1170px]  `}>
    <nav className={`flex items-center justify-between h-20 fixed top-0 left-0 w-64  z-[100] bg-white`} >
      <h2 className=" px-8 text-3xl text-c4 font-bold">pay.co</h2>
      {/** TOGGLE BUTTON */}
      <div className="flex  text-3xl text-c4 font- mr-2 " >
        <button onClick={() => dispatch(toggle())}><FaBarsStaggered /></button>
      </div>
    </nav>
    <div className="overflow-y-scroll no-scrollbar bg-white">
      <SmallSidebar />
    </div>
  </section>



}
export default SmallSidebarContainer;