import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'

const App = () => {
  const {register, handleSubmit} = useForm()

  const submitHandler = async (data) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("email", data.email)
    formData.append("profile_pic", data.profile_pic[0])
    console.log(formData)
    await axios.post("http://localhost:3000/user/create", formData)
  
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <input type="text" placeholder="Enter your name" {...register("name")} />
        <br/>
        <input type="email" placeholder="Enter your email" {...register("email")} />
         <br/>
        <input type="file" placeholder="Upload your profile picture" {...register("profile_pic")} />
         <br/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App
