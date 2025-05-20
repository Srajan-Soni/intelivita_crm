import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FileUpload from './components/FileUpload'
import { getData, setData } from './utils/helper'

function App() {

    const [jsonData, setJsonData] = useState([])
    
     useEffect(() => {
    const data = getData();
    if (data) {
      setJsonData(data);
    
    }
  }, []);

    const updateData = (data) => {
    setJsonData(data);
    setData(data);
    
    console.log('Updated JSON:', data)
  };

  return (
    <>
   <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Client Records Management</h1>

        <div className="mb-6 flex justify-center my-5 p-5 ">
          <FileUpload records={jsonData} updateData={updateData} />
        </div>
        </div>

    </div>
    </>
  )
}

export default App
