import { Link } from "react-router-dom";
import logo from '../assets/web-shopping.svg';

const Landing = () => {

  return <section className="mt-10">
    <nav className="px-8 flex items-center md:max-w-6xl md:mx-auto" >
      <div className="flex items-center justify-center text-slate-100 rounded-md  w-14 h-14 btn btn-secondary text-3xl">
        <h2>P</h2>
      </div>
      <div className=" px-8 text-3xl text-c4 font-semibold -ml-4">
        <h4 >pay.co</h4>
      </div>
    </nav>
    <article className="px-8 grid lg:grid-cols-2 gap-y-4 mt-36 max-w-3xl lg:max-w-6xl lg:mx-auto ">
      <div className="flex flex-col gap-y-6 ">
        <h1 className="text-3xl">Store <span className="text-cyan-600">Content Management</span> App</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi saepe a aut ratione perspiciatis odit labore adipisci nemo consequuntur voluptatem, recusandae quis itaque at, eum reiciendis quia iure numquam asperiores. Maxime ullam expedita esse nostrum ipsum suscipit veritatis voluptatem vitae?</p>
      </div>
      <div className="hidden lg:flex lg:ml-4">
        <img src={logo} />
      </div>
      <div className="lg:-mt-20">
        <Link className="btn btn-secondary w-56 capitalize text-xl" to={'/login'}>login / register</Link>
      </div>
    </article>



  </section>
}
export default Landing;