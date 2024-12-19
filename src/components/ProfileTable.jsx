'use client';
import deleteLyricDetails from "@/actions/deleteLyricDetails";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSession } from "next-auth/react";
import createRequest from "@/actions/createRequest";

const ProfileTable = ({table}) => {
    const initialData = Array.isArray(table) ? 
        table.map(item => ({
            ...item,
            _id: item._id.toString(),
            createdAt: item.createdAt ? item.createdAt.toString() : null,
            instrumentals: Array.isArray(item.instrumentals) ? item.instrumentals : [],
            karaoke: Array.isArray(item.karaoke) ? item.karaoke : [],
            dance: Array.isArray(item.dance) ? item.dance : [],
            covers: Array.isArray(item.covers) ? item.covers : []
        })) 
        : [];

    const [music, setMusic] = useState(initialData);
    const { data: session } = useSession();

    const handleEdit = async (songId) => {
        try {
            const request = await createRequest({
                userId: session?.user?.id,
                songId: songId,
                requestType: 'EDIT',
                message: 'Request to edit song'
            });
            alert('Edit request submitted successfully');
        } catch (error) {
            console.error('Error creating edit request:', error);
            alert('Failed to submit edit request');
        }
    };

    const handleDelete = async (songId) => {
        const confirmed = window.confirm('Are you sure you want to request deletion of this song?');
        if (!confirmed) {
            return;
        }
        try {
            const request = await createRequest({
                userId: session?.user?.id,
                songId: songId,
                requestType: 'DELETE',
                message: 'Request to delete song'
            });
            alert('Delete request submitted successfully');
        } catch (error) {
            console.error('Error creating delete request:', error);
            alert('Failed to submit delete request');
        }
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                <div className="flex justify-center space-x-2">
                                    <button 
                                        className="text-blue-600 hover:text-blue-800"
                                        onClick={() => handleEdit(row._id)}
                                    >
                                        <FaEdit className="w-5 h-5" />
                                    </button>
                                    <button 
                                        className="text-red-600 hover:text-red-800"
                                        onClick={() => handleDelete(row._id)}
                                    >
                                        <FaTrash className="w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProfileTable;