import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Terjadi kesalahan saat memuat data pengguna.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Memuat data pengguna...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">{error}</div>;
  }
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Daftar Pengguna</h2>
      <ul className="space-y-4">
        {data.map((user) => (
          <li key={user.id} className="p-4 border rounded-lg shadow-sm">
            <p className="text-lg font-medium">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-600">{user.address.city}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
