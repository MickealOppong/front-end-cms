import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";


const SingleProductD = ({ id, images, name, description, quantity, regularPrice, status, quantitySold, categories, createdBy }) => {
  return <div>
    <div className="flex  items-center text-sm w-[100vw] p-2 ">
      <div className="flex items-center gap-x-2 w-96 text-emerald-500">
        <img src={images[0]} className="w-12 h-12 rounded-xl" />
        <Link to={`/viewProduct/${id}`} className="link-hover">{name}</Link>
      </div>
      <div className="w-96">
        <p>{description.substring(0, 30)}</p>
      </div>
      <div className="w-96">
        <p>{id}</p>
      </div>
      <div className="w-96 uppercase text-xs text-emerald-700">
        {
          categories.map((item) => {
            const { id, name } = item;
            return <p key={id}>{name}</p>
          })
        }
      </div>
      <div className="w-56">
        <p>{regularPrice}</p>
      </div>
      <div className="w-56">
        <p>{quantity}</p>
      </div>
      <div className="w-96">
        <p>{quantitySold}</p>
      </div>
      <div className="w-96">
        <p>{createdBy}</p>
      </div>
      <div className="w-96">
        <p>{status}</p>
      </div>
      {/** ACTIONS */}
      <div className="flex w-80 gap-x-4 text-xl">
        <Link to={`/viewProduct/${id}`} className="text-sky-600" ><FaEye /></Link>
        <Link to={`/editProduct/${id}`} className="text-emerald-500 link link-primary" ><CiEdit /></Link>
        <button className="text-red-700" onClick={() => handleDelete(id)}><RiDeleteBin6Line /></button>
      </div>
    </div>
  </div>


}
export default SingleProductD