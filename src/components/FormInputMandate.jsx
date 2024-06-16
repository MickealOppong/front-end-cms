import { FaAsterisk } from "react-icons/fa";

const FormInputMandate = ({ type, name, size, label, placeholder }) => {
  return <label className="form-control ">
    <div className="label">
      <span className="label-text font-semibold capitalize mb-4 flex items-center gap-x-2">{label}
        <FaAsterisk className="text-red-600 text-[5px]" />
      </span>
    </div>
    <input type={type} className={`input input-bordered text-md text-gray-700  ${size}`} name={name} id={name} placeholder={placeholder} />
  </label>
}
export default FormInputMandate;