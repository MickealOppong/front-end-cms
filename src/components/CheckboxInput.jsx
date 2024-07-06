const CheckboxInput = ({ label, name, defCheck, style }) => {
  return <div className={`form-control ${style}`}>
    <label className="flex gap-x-24">
      <span className="label-text w-60">{label}</span>
      <input type="checkbox" defaultChecked={defCheck} className="checkbox checkbox-primary" name={name} />
    </label>
  </div>
}
export default CheckboxInput;