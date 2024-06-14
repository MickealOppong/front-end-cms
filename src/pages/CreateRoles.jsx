import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../components";
import { customFetch } from "../util";
import { roleData } from "../util/data";

const CreateRoles = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const [data, setData] = useState(roleData)
  const token = useSelector((state) => state.userState.token)
  const navigate = useNavigate();
  const width = () => {
    return ` w-11/12 max-w-6xl mx-auto h-[100vh] px-2`
  }
  const queryClient = useQueryClient();
  const { mutate: createRole } = useMutation({
    mutationFn: (data) => customFetch.post('/api/roles/roles', JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      navigate('/roles')
    },
    onError: (error) => {
      console.log(error);
    }
  })
  const handleChange = (model, id, role) => {

    setData(() => {
      const category = data.map((i) => {
        if (i.model === model) {
          if (role === 'all') {
            i.authorities.map((item) => {
              item.access = !item.access
              i.counter = i.counter + 1;
            })
          } else {
            i.authorities.find((item) => {
              if (item.id === id) {
                item.access = !item.access
                i.counter = i.counter + 1;
              }
            })
          }
        }
        return i;
      })
      return category;
    })



  }
  const HandleUserRoles = async (e) => {
    e.preventDefault();
    let roleList = [];
    const formData = new FormData(e.target)

    const obj = data.filter((item) => {
      return item.counter > 0;
    })
    obj.map((item) => {
      const { model, authorities } = item;
      const nx = authorities.filter((i) => {
        const { text } = i;
        if (text === 'all') return;
        if (i.access === true) {
          const toDb = {
            model,
            text
          }
          roleList.push(toDb)
        }
      })

    })

    formData.append('model', JSON.stringify(roleList))
    const accessList = Object.fromEntries(formData);
    console.log(accessList);
    createRole(accessList);
    e.target.reset();
  }


  return <section className={`mt-8  w-11/12 max-w-6xl mx-auto h-[100vh] px-2`}>
    <div className=" font-semibold uppercase mb-8 max-w-6xl mx-auto">
      <h2>create role</h2>
    </div>

    <form method="post" className={`flex flex-col gap-y-8  bg-white p-8 border-[1px] max-w-6xl mx-auto ${showSidebar ? 'mr-8' : ''}`} onSubmit={(e) => HandleUserRoles(e)}>
      <FormInput label='Role name' type='text' name='roleName' size='w-[60vw]' />
      <div className="text-md text-gray-700 font-semibold capitalize mb-4">
        <h2>permissions</h2>
      </div>
      <div className="flex flex-col gap-y-4" method="post">
        {
          data?.map((role) => {
            const { id, model, authorities } = role;
            return <div key={id} className="flex">
              <div className=" flex w-9/12  ">
                <h4 key={id} className="capitalize">{model}</h4>
              </div>
              {
                authorities?.map((role) => {
                  const { id, text, access } = role;
                  return <div className="flex w-1/2 gap-x-2 capitalize" key={id}>
                    <span className="label-text">{text}</span>
                    <input type="checkbox" className="checkbox checkbox-secondary" checked={access} onChange={() => handleChange(model, id, text)} />
                  </div>
                })
              }
            </div>
          })
        }
      </div>
      <div className="flex justify-start mt-4">
        <button type="submit" className="btn btn-secondary text-gray-100 w-24 capitalize" >save</button>
      </div>
    </form>

  </section>

}
export default CreateRoles;