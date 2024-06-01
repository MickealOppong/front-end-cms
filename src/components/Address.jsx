const Address = ({ street, city, zipCode, country }) => {
  return <article className="flex flex-col h-44">
    <div className="capitalize text-2xl mb-4 border-dotted border-b-2 py-2 ">
      <p>default Address</p>
    </div>
    <div className="text-slate-500">
      <div className="flex flex-col">
        <div className="flex gap-x-2">
          <span> {street}</span>
          <span>{zipCode}</span>
          <span>{city}</span>
        </div>
        <div className="flex">
          <p>{country}</p>
        </div>
      </div>
    </div>
  </article>
}
export default Address