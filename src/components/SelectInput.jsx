const SelectInput = ({ data, size, name }) => {

  return <select className={`select select-bordered ${size}`} name={name}>
    {
      data.map((item) => {
        return <option key={item}>{item}</option>
      })
    }
  </select>
}
export default SelectInput;