import { useDispatch, useSelector } from "react-redux";
import { SmallSidebar } from "./index";

const SmallSidebarContainer = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const dispatch = useDispatch()
  return <section className={`flex flex-col  overflow-y-scroll no-scrollbar h-[100vh]`}>

    <SmallSidebar />
  </section>
}
export default SmallSidebarContainer;