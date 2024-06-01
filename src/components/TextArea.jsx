import { FaAsterisk } from "react-icons/fa";
const TextArea = ({ placeholder, name, styles, defValue }) => {
  return <div className="flex flex-col">
    <label htmlFor="description" className="label-text capitalize text-gray-700 font-semibold flex gap-x-2 items-center">
      <span>{name}
      </span>
      <FaAsterisk className="text-red-600 text-[5px]" /></label>
    <textarea className={`textarea textarea-bordered mt-4 ${styles}`} placeholder={placeholder} id="description" name={name} defaultValue={defValue}></textarea>
  </div>
}
export default TextArea;