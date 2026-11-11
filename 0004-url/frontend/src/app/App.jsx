import { useState, useEffect } from 'react'
import axios from "axios"

import './App.css'


const dummyUrls = [
  {
    _id: "1",
    originalUrl: "https://www.amazon.in/s?k=dancing+cactus&i=toys&s=exact-aware-popularity-rank&ds=v1%3Ab%2BSw44ZvzhORklnWYW%2F09u9IzkAIAkk8r5Zql%2Fs3nso&_encoding=UTF8&_encoding=UTF8&content-id=amzn1.sym.b8899ac9-602c-49de-a4d4-9b889f6889d0&crid=3MRAAI2ZAPWM6&pd_rd_r=8b0cb029-bb54-4c28-81f6-f2b616a1e8f4&pd_rd_w=hBCOq&pd_rd_wg=wDI9d&pf_rd_p=b8899ac9-602c-49de-a4d4-9b889f6889d0&pf_rd_r=9FP1P0DKH9QT8JXZ5G0V&qid=1779019626&sprefix=dancing+cact%2Ctoys%2C280&ref=pd_hp_d_r_atf_unk",
    shortCode: "IUSJDF",
    clicks: 9
  },
  {
    _id: "2",
    originalUrl: "https://www.amazon.in/s?k=dancing+cactus&i=toys&s=exact-aware-popularity-rank&ds=v1%3Ab%2BSw44ZvzhORklnWYW%2F09u9IzkAIAkk8r5Zql%2Fs3nso&_encoding=UTF8&_encoding=UTF8&content-id=amzn1.sym.b8899ac9-602c-49de-a4d4-9b889f6889d0&crid=3MRAAI2ZAPWM6&pd_rd_r=8b0cb029-bb54-4c28-81f6-f2b616a1e8f4&pd_rd_w=hBCOq&pd_rd_wg=wDI9d&pf_rd_p=b8899ac9-602c-49de-a4d4-9b889f6889d0&pf_rd_r=9FP1P0DKH9QT8JXZ5G0V&qid=1779019626&sprefix=dancing+cact%2Ctoys%2C280&ref=pd_hp_d_r_atf_unk",
    shortCode: "IUSJDF",
    clicks: 5
  },
  {
    _id: "3",
    originalUrl: "https://www.amazon.in/s?k=dancing+cactus&i=toys&s=exact-aware-popularity-rank&ds=v1%3Ab%2BSw44ZvzhORklnWYW%2F09u9IzkAIAkk8r5Zql%2Fs3nso&_encoding=UTF8&_encoding=UTF8&content-id=amzn1.sym.b8899ac9-602c-49de-a4d4-9b889f6889d0&crid=3MRAAI2ZAPWM6&pd_rd_r=8b0cb029-bb54-4c28-81f6-f2b616a1e8f4&pd_rd_w=hBCOq&pd_rd_wg=wDI9d&pf_rd_p=b8899ac9-602c-49de-a4d4-9b889f6889d0&pf_rd_r=9FP1P0DKH9QT8JXZ5G0V&qid=1779019626&sprefix=dancing+cact%2Ctoys%2C280&ref=pd_hp_d_r_atf_unk",
    shortCode: "IUSJDF",
    clicks: 4
  },
]

function App() {

  const [urls, setUrls] = useState([])   // State to hold the list of URLs fetched from the backend
  const [inputValue, setInputValue] = useState("")   // State to hold the URL entered by the user
  const [currentUrl, setCurrentUrl] = useState(null)  // State to hold the URL that is currently being shortened


// Function to fetch the list of URLs from the backend

  async function fetchUrls() {

    const response = await axios.get("http://localhost:5173/api/url")

    const responseData = response.data // Get the data from the response

    setUrls(responseData.data)  // Update the state with the list of URLs fetched from the backend

    console.log(responseData)

  }

// Function to create a short URL by sending a POST request to the backend

  async function createShortUrl() {

    const response = await axios.post("http://localhost:5173/api/url", {
      url: inputValue   // url is the key expected by the backend, inputValue is the value entered by the user
    })

    setCurrentUrl({
      originalUrl: response.data.data.originalUrl,
      shortCode: response.data.data.shortCode
    })

    fetchUrls() // Fetch the updated list of URLs after creating a new short URL

  }

// Function to delete a URL by sending a DELETE request to the backend

  async function deleteUrl(id) {
    await axios.delete(`http://localhost:5173/api/url/${id}`)

    fetchUrls()  // Fetch the updated list of URLs after deleting a URL
  }

// useEffect hook to fetch the list of URLs when the component mounts

  useEffect(() => {  
    fetchUrls()  
  }, [])

  return (
    <main className='p-10 flex flex-col gap-4' >
      <div className='w-full max-w-4xl p-2 flex gap-2' >
        <input
          type="text"
          placeholder='Enter Long URL'
          value={inputValue}
          className='border rounded w-full p-2'
          onChange={(e) => { setInputValue(e.target.value) }}
        />
        <button
          className='rounded p-2 bg-orange-600 text-white cursor-pointer'
          onClick={createShortUrl}
        >Shorten</button>
      </div>

      <div className="w-full max-w-4xl px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between gap-4">
        <p className="truncate text-orange-700 font-medium">
          {currentUrl?.shortCode ? `http://localhost:3000/${currentUrl.shortCode}` : "Shortened URL will appear here"} 
        </p>
        <button className="px-4 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-700 text-sm font-medium hover:bg-stone-50 transition-colors cursor-pointer">
          Copy
        </button>
      </div>

      <div className='w-full max-w-4xl p-2 flex flex-col gap-2' >
        {
          urls?.map(url => {
            return (
              <div key={url._id} className='border border-neutral-200 p-2 flex gap-8 justify-evenly items-center' >
                <a href={`http://localhost:3000/${url.shortCode}`} target='_blank' >{url.shortCode}</a>
                <p className='truncate' >{url.originalUrl}</p>
                <p>{url.clicks}</p>
                <div className='flex gap-2' >
                  <button className='p-2 rounded bg-orange-600 text-white cursor-pointer' >COPY</button>
                  <button
                    onClick={() => deleteUrl(url._id)}
                    className='p-2 rounded bg-orange-600 text-white cursor-pointer' >DELETE</button>
                </div>
              </div>
            )
          })
        }

      </div>
    </main>
  )
}

export default App