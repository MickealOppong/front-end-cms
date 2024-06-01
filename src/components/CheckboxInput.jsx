const CheckboxInput = ({ label, name, defCheck }) => {
  return <div className="form-control">
    <label className="flex gap-x-24">
      <span className="label-text w-56">{label}</span>
      <input type="checkbox" defaultChecked={defCheck} className="checkbox checkbox-primary" name={name} />
    </label>
  </div>
}
export default CheckboxInput;