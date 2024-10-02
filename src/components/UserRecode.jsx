import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserRecode() {
    let [users, setUsers] = useState([]);
    let [searchTerm, setSearchTerm] = useState('');
    let [sortOrder, setSortOrder] = useState('asc');
    let [currentPage, setCurrentPage] = useState(1);
    let [usersPerPage] = useState(3);
    let navigator = useNavigate();

    useEffect(() => {
        fetchRecode();
    }, []);

    let fetchRecode = () => {
        fetch('http://localhost:3000/user', {
            method: 'get'
        })
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    let deleteData = (id) => {
        fetch(`http://localhost:3000/user/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                fetchRecode();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    let editData = (id) => {
        navigator(`/edit/${id}`);
    };

    let filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    let sortedUsers = filteredUsers.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.username.localeCompare(b.username);
        } else {
            return b.username.localeCompare(a.username);
        }
    });

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen flex flex-col items-center py-10 bg-gray-100">
            <div className="w-3/4 mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">User Records</h2>
                    <Link to="/" className="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
                        Add Record
                    </Link>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by username or email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                    />

                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-sm text-left text-gray-500 bg-white shadow-md rounded-lg">
                        <thead className="bg-blue-600 text-white text-lg uppercase">
                            <tr>
                                <th className="font-normal ps-4 py-2">Username</th>
                                <th className="font-normal px-4 py-2">Email</th>
                                <th className="font-normal px-4 py-2">Password</th>
                                <th className="font-normal px-4 py-2">Gender</th>
                                <th className="font-normal px-4 py-2">Hobby</th>
                                <th className="font-normal px-4 py-2">City</th>
                                <th className="font-normal px-4 py-2">Address</th>
                                <th className="font-normal ps-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user) => (
                                <tr key={user.id} className="border-b hover:bg-gray-100">
                                    <td className="px-4 py-3">{user.username}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3">{user.password}</td>
                                    <td className="px-4 py-3">{user.gender}</td>
                                    <td className="px-4 py-3">{user.hobby ? user.hobby.toString() : ''}</td>
                                    <td className="px-4 py-3">{user.city}</td>
                                    <td className="px-4 py-3">{user.address}</td>
                                    <td className="px-4 py-3 flex space-x-2">
                                        <button
                                            onClick={() => deleteData(user.id)}
                                            className="text-white bg-red-600 px-3 py-1 rounded-md hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => editData(user.id)}
                                            className="text-white bg-yellow-500 px-3 py-1 rounded-md hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex items-center">
                    <div>
                        {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <select onChange={(e) => setSortOrder(e.target.value)} className="border ms-auto w-52 border-gray-300 rounded p-2 mt-2">
                        <option value="asc">Sort by Username (A-Z)</option>
                        <option value="desc">Sort by Username (Z-A)</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default UserRecode;
