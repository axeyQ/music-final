'use client';
import deleteLyricDetails from "@/actions/deleteLyricDetails";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProfileTable = ({table}) => {
    const [music,setMusic] = useState(table);
    const handleEdit = (id) => {
        // Add your edit logic here
        console.log('Edit clicked for id:', id);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this song?');
        if (!confirmed) {
            return;
        }
        await deleteLyricDetails(id);
        const updatedMusic = music.filter((item) => item._id !== id);
        setMusic(updatedMusic);
    };

    return(
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 relative">
                <thead className="bg-gray-50 sticky top-0">
                    <tr>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100 transition-colors">UID</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100 transition-colors">Date Time</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100 transition-colors">Title</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100 transition-colors">Instrumentals</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100 transition-colors">Karaoke</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100 transition-colors">Dance</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100 transition-colors">Covers</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100 transition-colors">Status</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100 transition-colors">Earnings</th>
                        {/* <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100 transition-colors">Actions</th> */}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {music && Array.isArray(music) && music.map((row, index) => (
                        row && <tr key={row._id || index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">
                                {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                {row.createdAt ? new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }).format(new Date(row.createdAt)) : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                                {row.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                {row.instrumentals.length}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                {row.karaoke.length}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                {row.dance.length}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                {row.covers.length}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Approved
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-medium">
                            ₹0
                            </td>
                            {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                <div className="flex justify-center space-x-2">
                                    <button 
                                        onClick={() => handleEdit(row._id)} 
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <FaEdit className="w-5 h-5" />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(row._id)} 
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FaTrash className="w-5 h-5" />
                                    </button>
                                </div>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProfileTable;