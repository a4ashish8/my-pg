import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../services/opertions/user"
import Error from "./Error"

function UserList() {
  const { loading } = useSelector((state) => state.profile) // Redux loading state
  const dispatch = useDispatch()

  // Local state for users and error handling
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [localLoading, setLocalLoading] = useState(false) // Local loading state

  useEffect(() => {
    const fetchUsers = async () => {
      setLocalLoading(true)  // Set loading to true
      try {
        const res = await getAllUsers()
        if (res.success) {
          setUsers(res.data)
        } else {
          setError("Could not fetch user details.")
        }
      } catch (error) {
        setError("An error occurred while fetching users.")
        console.log("Could not fetch user details", error)
      }
      setLocalLoading(false)  // Set loading to false
    }

    fetchUsers()
  }, [])

  if (loading || localLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (error) {
    return <Error message={error} />
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="p-4 border rounded shadow-md">
              <p className="text-lg font-semibold">{`${user.first_name} ${user.last_name}`}</p>
              <p>Age: {user.age}</p>
              <p>Sex: {user.sex}</p>
              <p>Date of Birth: {user.dob}</p>
            </div>
          ))
        ) : (
          <p>No users available.</p>
        )}
      </div>
    </div>
  )
}

export default UserList
