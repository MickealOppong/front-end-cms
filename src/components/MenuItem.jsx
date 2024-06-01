import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiDisc } from "react-icons/fi";
import { Link } from "react-router-dom";
const MenuItem = ({ icon, title, id, links }) => {
  const [showLink, setShowLink] = useState(true);


  return <div key={id}>
    <div onClick={() => setShowLink(!showLink)} className="flex items-center justify-between capitalize w-56 px-2">
      <div className="flex items-center gap-x-2 tracking-wide font-semibold text-sm">
        <span className="text-md">{icon}</span>
        <h2 className="text-md">{title}</h2>
      </div>
      <span>
        {
          showLink ? <FaChevronDown /> : <FaChevronUp />
        }
      </span>
    </div>
    <ul hidden={showLink}>
      {
        links.map((link) => {
          const { id, menu, url } = link;
          return <div className="flex flex-col px-8 my-2 " key={id}>
            <Link to={url} className="flex items-center gap-x-2 capitalize text-sm list-disc  w-56">
              <FiDisc className="text-[5px]" />
              <p className="text-gray-500 font-semibold">{menu}</p></Link>
          </div>
        })
      }
    </ul>
  </div>
}
export default MenuItem