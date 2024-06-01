
import { AiOutlineCloseSquare } from "react-icons/ai";
import { BiSquare } from "react-icons/bi";
const List = ({ array, insertIntoContainer }) => {
  return <div className="h-80 w-80 overflow-y-auto no-scrollbar border-2 shadow-xl text-gray-500 bg-white pt-4 rounded-md">
    {
      array.map((a, index) => {
        const { id, name } = a;
        return <ul key={id} className="">
          <li onClick={() => insertIntoContainer(id, index, 'left')} className="flex items-center gap-x-4 capitalize hover:bg-slate-100 p-4 ">
            <button >
              {
                leftSelected[index] ? <AiOutlineCloseSquare className="text-xl" /> : <BiSquare className="text-xl" />
              }
            </button>
            <span>{name}</span>
          </li>
        </ul>
      })
    }
  </div>
}
export default List;