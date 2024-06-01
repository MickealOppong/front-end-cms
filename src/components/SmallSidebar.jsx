import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../features/sidebar/sidebarSlice";
import { dashboardMenu, links, settingsMenu } from "../util/data";
import MenuItem from "./MenuItem";
import SectionTitle from "./SectionTitle";

const SmallSidebar = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const dispatch = useDispatch();

  return <section className={`flex flex-col ${showSidebar ? 'flex' : 'hidden'} min-h-[100vh] bg-white`}>
    <nav className={`flex items-center justify-between h-20  z-[101] bg-cyan-100  overflow-y-scroll sm:no-scrollbar `} >
      <h2 className=" px-8 text-3xl text-c4 font-bold">pay.co</h2>
      {/** TOGGLE BUTTON */}
      <div className="flex  text-3xl text-c4 font-bold " >
        <button onClick={() => dispatch(toggle())}><FaTimes /></button>
      </div>
    </nav>
    <aside className={`flex flex-col p-8 gap-y-8 z-50 relative `}>
      <div className="flex flex-col">
        <div className="">
          <SectionTitle title='main home' style='uppercase text-xs text-gray-400 mb-4 font-semibold' />
          <div className="flex flex-col gap-y-4 cursor-pointer">
            {
              dashboardMenu.map((link) => {
                return <MenuItem {...link} key={link.id} />
              })
            }
          </div>
        </div>

      </div>

      <div className="flex flex-col mt-10">
        <SectionTitle title='all pages' style='uppercase text-xs text-gray-400 mb-4 font-semibold' />
        <div className="flex flex-col gap-y-4 cursor-pointer">
          {
            links.map((link) => {
              return <MenuItem {...link} key={link.id} />
            })
          }
        </div>
      </div>
      <div className="mt-10">
        <SectionTitle title='settings' style='uppercase text-xs text-gray-400 mb-4 font-semibold' />
        {
          settingsMenu.map((item) => {
            return <MenuItem {...item} key={item.id} />
          })
        }
      </div>
    </aside>
  </section>
}
export default SmallSidebar;