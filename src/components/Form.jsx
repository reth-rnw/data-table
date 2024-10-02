import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Form() {

    let [data, setData] = useState({});
    let [hobby, setHobby] = useState([]);
    let navigator = useNavigate();

    let handleInput = (e) => {
        let { name, value } = e.target;

        let hobbies = [...hobby];
        if (name === 'hobby') {
            if (e.target.checked) {
                hobbies.push(value);
            } else {
                let pos = hobbies.findIndex((v, i) => value === v);
                hobbies.splice(pos, 1);
            }
            value = hobbies;
        }
        setHobby(hobbies);
        setData({ ...data, [name]: value });
    };

    let handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3000/user', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(() => {
            toast.success("Data Added Successfully!");
            setTimeout(() => {
                navigator('/userRecode');
            }, 1000);
        }).catch((err) => {
            toast.error("Error Adding Data.");
            console.error(err);
        });
    };

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10">
                <div className="bg-white p-8 shadow-md rounded-lg max-w-lg w-full">
                    <h2 className="text-2xl font-semibold text-center mb-6">Add User Data</h2>
                    <form method='post' onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label className="mb-2 text-gray-700">Username</label>
                            <input type="text" name="username" onChange={handleInput} className="border p-2 rounded-md" />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 text-gray-700">Email</label>
                            <input type="email" name="email" onChange={handleInput} className="border p-2 rounded-md" />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 text-gray-700">Password</label>
                            <input type="password" name="password" onChange={handleInput} className="border p-2 rounded-md" />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 text-gray-700">Gender</label>
                            <div className="space-x-4">
                                <label>
                                    <input type="radio" name="gender" value='male' onChange={handleInput} className="mr-1" /> Male
                                </label>
                                <label>
                                    <input type="radio" name="gender" value='female' onChange={handleInput} className="mr-1" /> Female
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 text-gray-700">Hobby</label>
                            <div className="space-x-4">
                                <label>
                                    <input type="checkbox" name="hobby" value='Dance' onChange={handleInput} className="mr-1" /> Dance
                                </label>
                                <label>
                                    <input type="checkbox" name="hobby" value='Writing' onChange={handleInput} className="mr-1" /> Writing
                                </label>
                                <label>
                                    <input type="checkbox" name="hobby" value='Reading' onChange={handleInput} className="mr-1" /> Reading
                                </label>
                                <label>
                                    <input type="checkbox" name="hobby" value='Coding' onChange={handleInput} className="mr-1" /> Coding
                                </label>
                                <label>
                                    <input type="checkbox" name="hobby" value='Gaming' onChange={handleInput} className="mr-1" /> Gaming
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 text-gray-700">City</label>
                            <select name="city" onChange={handleInput} className="border p-2 rounded-md">
                                <option value="" disabled selected> Select City </option>
                                <option value="Surat">Surat</option>
                                <option value="Vadodara">Vadodara</option>
                                <option value="Vapi">Vapi</option>
                                <option value="Ahmedabad">Ahmedabad</option>
                                <option value="Anand">Anand</option>
                                <option value="Gandhinagar">Gandhinagar</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 text-gray-700">Address</label>
                            <textarea name="address" onChange={handleInput} className="border p-2 rounded-md"></textarea>
                        </div>
                        <div className="flex justify-between items-center">
                            <Link to="/userRecode" className="text-blue-500 hover:underline">View Records</Link>
                            <input type="submit" value="Add Record" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer" />
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={1000} 
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false} 
                draggable
                pauseOnHover={false} 
                theme="dark"
                transition="bounce"
            />
        </>
    );
}

export default Form;
