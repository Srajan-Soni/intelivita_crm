import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FileUpload from "./components/FileUpload";
import { getData, setData } from "./utils/helper";
import RecordsTable  from "./components/RecordsTable";

function App() {
  const [jsonData, setJsonData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  

  useEffect(() => {
    const data = getData();
    if (data) {
      setJsonData(data);
      setFilteredData(data); 
    }
  }, []);

  const updateData = (data) => {
  setJsonData(data);
  setData(data);

  
  if (search.trim() === "") {
    setFilteredData(data);
  } else {
    const lower = search.toLowerCase();
    const filtered = data.filter(
      (record) =>
        record.id.toString().includes(lower) ||
        record.name.toLowerCase().includes(lower) ||
        record.email.toLowerCase().includes(lower)
    );
    setFilteredData(filtered);
  }

  console.log("Updated JSON:", data);
};


   const handleSearch = (text) => {
  setSearch(text);
  const lower = text.toLowerCase();
  const filtered = jsonData.filter(
    (record) =>
      record.id.toString().includes(lower) ||
      record.name.toLowerCase().includes(lower) ||
      record.email.toLowerCase().includes(lower)
  );
  setFilteredData(filtered);
};


  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
            Client Records Management
          </h1>

          <div className="mb-6 flex justify-center my-5 p-5 ">
            <FileUpload records={jsonData} updateData={updateData} />
          </div>

          <div>
            <h1 className="text-xl py-2 my-2 font-bold">Search Records</h1>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by id, Name or Email"
                className="border p-2 w-full border-gray-300 rounded-md"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>

          <RecordsTable filteredData={filteredData} updateData={updateData}  />
        </div>
      </div>
    </>
  );
}

export default App;
