import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";
import { customFetch } from "../util";

export const loader = (store) => () => {
  const user = store.getState().userState.user;
  if (!user) {
    return redirect("/landing")
  }
  return null;
}
const Dashboard = () => {

  const accessToken = localStorage.getItem('jwt');
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const token = useSelector((state) => state.userState.token)
  const [tokenExpired, setTokenExpired] = useState(false);


  const { mutate: refreshToken } = useMutation({
    mutationFn: (accessToken) => customFetch.post('/api/auth/refreshToken', { accessToken }, {
      headers: {
        "Content-Type": 'multipart/form-data'
      }
    }),
    onSuccess: (res) => {
      console.log(res);
      localStorage.setItem('jwt', res.data.accessToken)
      localStorage.setItem('token', res.data.token)
    },
    onError: (error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        return redirect("/login")
      }
    }
  })
  useEffect(() => {
    const tokenTime = jwtDecode(token);
    const currentTime = new Date() / 1000;

    if (tokenTime > currentTime) {
      setTokenExpired(() => true)
    }
    refreshToken(accessToken);
  }, [tokenExpired])
  return <section className={`mt-8 w-full px-16 h-[300vh] `
  }>
    <h2>Dashboard</h2>
  </section>
}
export default Dashboard