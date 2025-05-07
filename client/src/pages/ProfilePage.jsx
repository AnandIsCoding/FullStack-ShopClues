import React from 'react'
import { useSelector } from 'react-redux'

function ProfilePage() {
  const user = useSelector(state => state.user.user)
  console.log(user)

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">No Profile Found</h2>
          <p className="mt-2 text-gray-500">Please log in to view your profile.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-200">
      <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-md w-full">
        <img
          src={user.profilePic}
          alt={`${user.userName} Image`}
          className="w-28 h-28 rounded-full mx-auto shadow-md object-cover"
        />
        <h2 className="text-3xl font-bold text-gray-800 mt-4">{user.userName}</h2>
        <p className="text-sm text-gray-500 mb-6">{user.accountType === 'admin' ? 'Administrator' : 'User'}</p>
        
        <div className="text-left space-y-2 text-gray-700">
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Account Type:</span> {user.accountType}</p>
          <p><span className="font-semibold">Member Since:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
