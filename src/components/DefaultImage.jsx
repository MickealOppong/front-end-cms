const DefaultImage = ({ name, size }) => {
  //console.log(name);
  return <div className={`flex justify-center items-center text-gray-100 rounded-full bg-cyan-700  uppercase ${size}`}>
    <h2>{name.substring(0, 1)}</h2>
  </div>
}
export default DefaultImage;