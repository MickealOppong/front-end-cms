import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../features/sidebar/sidebarSlice";
import { dashboardMenu, links, settingsMenu } from "../util/data";
import MenuItem from "./MenuItem";
import SectionTitle from "./SectionTitle";

const SmallSidebar = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const dispatch = useDispatch();

  return <aside className={`flex flex-col p-8 border-r-2 min-h-[100vh] bg-white gap-y-8 z-[100] relative ${showSidebar ? 'flex' : 'hidden'}`}>
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
    <div className='absolute left-80'>
      <button onClick={() => dispatch(toggle())}><FaTimes /></button>
    </div>
  </aside>
}
export default SmallSidebar;