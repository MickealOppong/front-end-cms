
const FormInput = ({ type, name, size, label, placeholder, defValue }) => {
  return <label className="form-control w-full max-w-xs">
    <div className="label">
      <span className="label-text font-semibold capitalize mb-4 flex items-center">{label}
      </span>
    </div>
    <input type={type} className={`input input-bordered text-md text-gray-700  ${size}`} name={name} id={name} placeholder={placeholder} defaultValue={defValue} defaultChecked={defValue} multiple />
  </label>
}
export default FormInput;