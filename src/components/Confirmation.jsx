const Confirmation = () => {
  return <section>
    <div className="flex flex-col gap-y-4 absolute top-[20vh] left-[30vw] w-80 h-36 p-4  bg-white drawer-overlay">
      <h2>Are you sure? </h2>
      <div className="flex gap-x-4">
        <button className="btn btn-primary">Yes</button>
        <button className="btn btn-secondary">No</button>
      </div>
    </div>

  </section>


}
export default Confirmation;