import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { FaIndustry, FaTag } from "react-icons/fa";
import { FiTruck } from "react-icons/fi";
import { RiBox2Fill, RiPriceTag2Fill } from "react-icons/ri";
import CreateVendor from "./CreateVendor";
import Restock from "./Restock";
import Shipping from "./Shipping";
const menu = [
  { id: nanoid(), icon: <RiPriceTag2Fill />, text: 'features', elem: <Restock /> },
  { id: nanoid(), icon: <FaTag />, text: 'instructions', elem: <Restock /> },
  { id: nanoid(), icon: <RiBox2Fill />, text: 'restock', elem: <Restock /> },
  { id: nanoid(), icon: <FiTruck />, text: 'shipping', elem: <Shipping /> },
  { id: nanoid(), icon: <FaIndustry />, text: 'vendor', elem: <CreateVendor /> },
]
const Inventory = () => {
  const [active, setActive] = useState(menu[0].id);
  const item = menu.find((i) => i.id === active)

  return <div className="flex gap-x-16 text-gray-600 border-2">
    <div className="bg-white">
      {
        menu.map((item) => {
          const { id, icon, text } = item;
          return <ul key={id}>
            <li className={`flex items-center gap-x-2 capitalize p-4 border-t-2 border-b-2 border-r-2 w-80 cursor-pointer ${id === active ? 'text-c4 font-semibold ' : ''}`} onClick={() => setActive(id)}>{icon}{text}</li>
          </ul>
        })
      }
    </div>
    <div>
      {
        item?.elem
      }
    </div>
  </div>
}
export default Inventory