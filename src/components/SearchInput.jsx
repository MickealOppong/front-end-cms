import { BiSearchAlt2 } from "react-icons/bi";
const SearchInput = ({ type, name, size }) => {
  return <div className={`flex items-center input input-bordered ${size}`}>
    <BiSearchAlt2 />
    <input type={type} placeholder="Type here" className={`${size}`} name={name} />
  </div>
}
export default SearchInput;