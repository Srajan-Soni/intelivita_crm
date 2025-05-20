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
    <div className="overflow-x-auto">
      <div className="min-w-full rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full bg-white text-sm text-left text-gray-600">
          <thead className="bg-blue-100 text-gray-700 sticky top-0">
            <tr>
              <th className="px-6 py-3 font-semibold border-b">ID</th>
              <th className="px-6 py-3 font-semibold border-b">Name</th>
              <th className="px-6 py-3 font-semibold border-b">Email</th>
              <th className="px-6 py-3 font-semibold border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((record) => (
              <tr
                key={record.id}
                className="hover:bg-gray-50 transition duration-150 ease-in-out"
              >
                <td className="px-6 py-4 border-b">{record.id}</td>
                <td className="px-6 py-4 border-b">{record.name}</td>
                <td className="px-6 py-4 border-b">{record.email}</td>
                <td className="px-6 py-4 border-b flex justify-center gap-2">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs shadow-sm"
                    onClick={() => setEditing(record)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs shadow-sm"
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

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
