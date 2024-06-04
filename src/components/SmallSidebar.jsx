import { useDispatch, useSelector } from "react-redux";
import { dashboardMenu, links, settingsMenu } from "../util/data";
import SectionTitle from "./SectionTitle";
import SmallSidebarMenuItem from "./SmallSidebarMenuItem";


const SmallSidebar = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const dispatch = useDispatch();

  return <aside className={`flex flex-col p-8 gap-y-8 w-64 mt-24`}>
    <div className="flex flex-col">
      <div className="">
        <SectionTitle title='main home' style='uppercase text-xs text-gray-400 mb-4 font-semibold' />
        <div className="flex flex-col gap-y-4 cursor-pointer">
          {
            dashboardMenu.map((link) => {
              return <SmallSidebarMenuItem {...link} key={link.id} />
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
            return <SmallSidebarMenuItem {...link} key={link.id} />
          })
        }
      </div>
    </div>
    <div className="mt-10">
      <SectionTitle title='settings' style='uppercase text-xs text-gray-400 mb-4 font-semibold' />
      {
        settingsMenu.map((item) => {
          return <SmallSidebarMenuItem {...item} key={item.id} />
        })
      }
    </div>
  </aside>
}
export default SmallSidebar;