import React from 'react';
import { Save, X } from 'lucide-react';

const EditProfileForm = ({ formData, handleInputChange, handleSubmit, setIsEditing }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-6">
                <div  className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Profile :</h2>
                    <input
                        type="text"
                        value={formData.user_id}
                        className="w-64 py-2 rounded-lg border border-transparent bg-transparent dark:text-white dark:text-black cursor-not-allowed text-xl"
                        disabled
                    />
                </div>
                <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex items-center px-4 py-2 rounded-lg bg-gray-200 text-gray-800 dark:bg-slate-700 dark:text-white"
                >
                    <X size={18} className="mr-2" /> Cancel
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                        required
                    />
                </div>
            </div>
            <div className="mt-8 flex justify-end">
                <button
                    type="submit"
                    className="flex items-center bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    <Save size={18} className="mr-2" /> Save Changes
                </button>
            </div>
        </form>
    );
};

export default EditProfileForm;
