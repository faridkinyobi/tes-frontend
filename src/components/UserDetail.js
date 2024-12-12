import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError("Terjadi kesalahan saat memuat detail pengguna.");
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-4">Memuat detail pengguna...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Detail Pengguna</h2>
      <div className="space-y-4">
        <p><strong>Nama:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Telepon:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
        <p><strong>Alamat:</strong> {`${user.address.street}, ${user.address.city}`}</p>
      </div>
      <Link
        to="/"
        className="mt-6 block text-blue-500 hover:underline text-center"
      >
        Kembali ke Daftar Pengguna
      </Link>
    </div>
  );
};

export default UserDetail;
