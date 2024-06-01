import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import defImage from '../assets/index.jpeg';

const SingleOrder = () => {
  return <div>
    <div className="flex  items-center text-sm w-[100vw] p-2 ">
      <div className="flex items-center gap-x-2 w-96 text-emerald-500">
        <img src={defImage} className="w-12 h-12 rounded-xl" />
        <Link to={`/orderDetails/`} className="link-hover">name</Link>
      </div>
      <div className="w-96">
        <p>description</p>
      </div>
      <div className="w-96">
        <p>id</p>
      </div>
      <div className="w-56">
        <p>na</p>
      </div>
      <div className="w-56">
        <p>2</p>
      </div>
      <div className="w-96">
        <p>pending</p>
      </div>
      {/** ACTIONS */}
      <div className="flex w-80 gap-x-4 ">
        <Link to={`/viewProduct/`} className="text-sky-600" ><FaEye /></Link>
        <Link to={`/editProduct/`} className="text-emerald-500 link link-primary" ><CiEdit /></Link>
        <button className="text-red-700" onClick={() => handleDelete(id)}><RiDeleteBin6Line /></button>
      </div>
    </div>
  </div>


}
export default SingleOrder