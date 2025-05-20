import React from "react";
import { updateJsonData } from "../utils/helper";

const FileUpload = ({ records, updateData }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target.result;
        try {
          const jsonData = JSON.parse(contents);
          console.log("Parsed JSON:", jsonData);
          const mergedRecords = updateJsonData(records, jsonData);
          updateData(mergedRecords);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };
  return (
    <div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Upload JSON File</label>
        <input type="file" accept=".json" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default FileUpload;
