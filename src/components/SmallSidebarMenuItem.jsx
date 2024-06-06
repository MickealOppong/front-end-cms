import { useRef, useState } from "react";
import { FiDisc } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggle } from "../features/sidebar/sidebarSlice";
const SmallSidebarMenuItem = ({ icon, title, id, links }) => {
  const [showLink, setShowLink] = useState(true);
  const menuRef = useRef(null)
  const linkRef = useRef(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const navigateToRoute = (url) => {
    navigate(url)
    dispatch(toggle())
  }
  return <div key={id} >
    <div onClick={() => setShowLink(!showLink)} className="collapse collapse-plus -mt-4 ">
      <input type="radio" name="my-accordion-3" defaultChecked />
      <div className="collapse-title text-sm capitalize font-medium  ">
        <div className="flex items-center gap-x-2">
          <span className="text-xl">{icon}</span>
          <h2 className="text-md">{title}</h2>
        </div>
      </div>
      <div className="collapse-content -mt-2">
        {
          links.map((link) => {
            const { id, menu, url } = link;
            return <div className={`flex flex-col px-8  w-56 mt-2 `} key={id}>
              <button onClick={() => navigateToRoute(url)} className="flex items-center gap-x-2 capitalize text-sm list-disc  w-56 cursor-pointer">
                <FiDisc className="text-[5px]" />
                <p className="text-gray-500 font-semibold">{menu}</p></button>
            </div>
          })
        }
      </div>
    </div>

  </div>

}
export default SmallSidebarMenuItem