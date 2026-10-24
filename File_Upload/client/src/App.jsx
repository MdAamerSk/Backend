import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const App = () => {
  const { register, handleSubmit } = useForm()

  const submitHandler = async (data) => {

    console.log(data)

    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("email", data.email)

    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i])
    }

    await axios.post("http://localhost:3000/user/create", formData, {
      withCredentials: true
    })

  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <input type="text" placeholder="Enter your name" {...register("name")} />
        <br />
        <input type="email" placeholder="Enter your email" {...register("email")} />
        <br />
        <input type="file" placeholder="Upload your profile picture" {...register("images")} multiple />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App

//why we use for loop in the submitHandler function?The for loop in the `submitHandler` function is used to iterate over the array of files selected by the user in the file input field. When a user selects multiple files, they are stored in the `data.images` array.

//The `for` loop allows us to append each selected file to the `FormData` object individually. This is necessary because the `FormData.append()` method can only add one file at a time. By looping through the `data.images` array, we ensure that all selected files are included in the form data that will be sent to the server.