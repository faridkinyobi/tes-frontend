import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
        setFilteredUsers(response.data); // Set initial filtered users
        setLoading(false);
      } catch (err) {
        setError("Terjadi kesalahan saat memuat data pengguna.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter pengguna berdasarkan nama
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  if (loading) {
    return <div className="text-center mt-4">Memuat data pengguna...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Daftar Pengguna</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Cari berdasarkan nama..."
        className="mb-4 p-2 border rounded w-full"
      />
      <ul className="space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user.id} className="p-4 border rounded-lg shadow-sm">
              <p className="text-lg font-medium">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <Link
                to={`/user/${user.id}`}
                className="text-blue-500 hover:underline"
              >
                Lihat Detail
              </Link>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">Tidak ada pengguna ditemukan.</p>
        )}
      </ul>
    </div>
  );
};

export default UserList;
