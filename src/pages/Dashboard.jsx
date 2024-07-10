import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";

export const loader = (store) => () => {
  const user = store.getState().userState.user;
  if (!user) {
    return redirect("/landing")
  }
  return null;
}
const Dashboard = () => {

  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)

  return <section className={`mt-8 w-full px-16 h-[300vh] `
  }>
    <h2>Dashboard</h2>
  </section>
}
export default Dashboard