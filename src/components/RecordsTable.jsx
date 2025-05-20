import React, { useState } from 'react';
import EditModal from './EditModal';
import Pagination from './Pagination';

const RecordsTable = ({ filteredData, updateData }) => {
  const [editing, setEditing] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + recordsPerPage);

  const handleDelete = (id) => {
    const updated = filteredData.filter((r) => r.id !== id);
    updateData(updated);
    if (currentData.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEditSave = (updatedRecord) => {
    const updated = filteredData.map((r) =>
      r.id === updatedRecord.id ? updatedRecord : r
    );
    updateData(updated);
  };

  return (
    <div className="overflow-x-auto w-full">
      <div className="w-full rounded-lg shadow border border-gray-200">
        <table className="w-full bg-white text-sm text-left text-gray-700">
          <thead className="bg-blue-100 text-gray-800">
            <tr>
              <th className="px-4 py-3 font-semibold">ID</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 border-t">{record.id}</td>
                <td className="px-4 py-3 border-t">{record.name}</td>
                <td className="px-4 py-3 border-t break-words max-w-xs">{record.email}</td>
                <td className="px-4 py-3 border-t flex flex-wrap justify-center gap-2">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs"
                    onClick={() => setEditing(record)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs"
                    onClick={() => handleDelete(record.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {editing && (
        <EditModal
          record={editing}
          isOpen={!!editing}
          onClose={() => setEditing(null)}
          onSave={handleEditSave}
          existingEmails={filteredData.map((r) => r.email)}
        />
      )}
    </div>
  );
};

export default RecordsTable;
