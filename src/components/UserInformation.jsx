import { nanoid } from "nanoid";
import { useState } from "react";
import { BsCart } from "react-icons/bs";
import { FiStar, FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";
import UserBio from "./UserBio";
import UserOrders from "./UserOrders";
import UserReviews from "./UserReviews";

const titleArray = [
  { id: nanoid(), icon: <BsCart />, text: 'orders', elem: <UserOrders /> },
  { id: nanoid(), icon: <FiStar />, text: 'reviews', elem: <UserReviews /> },
  { id: nanoid(), icon: <FiUser />, text: 'personal information', elem: <UserBio /> },
]

const userInformation = () => {

  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const [active, setActive] = useState(titleArray[0].id);
  const item = titleArray.find((item) => item.id === active)
  const handleClick = (e) => {
    setActive(e)
  }


  return <div className={`flex flex-col ${showSidebar ? '' : 'max-w-[80%] mx-auto'} mt-12`}>
    <div className="flex gap-x-12 w-[50%]">
      {
        titleArray.map((item) => {
          const { id, icon, text } = item;
          return <div key={id}>
            <button className={`flex items-center gap-x-2 capitalize text-sm ${active === id ? 'text-sky-600' : ''}`} onClick={(e) => handleClick(e.target
              .dataset.id)} data-id={id}>
              {icon}{text}
            </button>
            <div className={`mt-2 ${active === id ? 'h-[1px] bg-sky-600 w-auto' : ''} `}>

            </div>

          </div>


        })
      }
    </div>
    <div className="mt-10">
      {
        item.elem
      }
    </div>
  </div >
}
export default userInformation