
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
          <label htmlFor="file-upload" className="cursor-pointer inline-block">
        <img
          src={"https://png.pngtree.com/png-clipart/20190921/original/pngtree-file-upload-icon-png-image_4717174.jpg"}
          alt="Upload JSON"
          className="w-16 h-16 mx-auto hover:scale-105 transition"
        />
        <p className="text-sm text-gray-600 mt-2 font-medium">Click to Upload JSON</p>
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
      </div>
    </div>
  );
};

export default FileUpload;
