'use client'

import { useState } from 'react'
import { deleteUsername } from './action'

const DeleteButton = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false)
  const handleDelete = async () => {
    const ok = confirm('Are you sure you want to delete this username?')
    if (ok) {
      setLoading(true)
      const errors = await deleteUsername(id)
      setLoading(false)
      if (errors) alert(errors.join('\n'))
    }
  }
  return (
    <button onClick={() => handleDelete()}>
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  )
}

export default DeleteButton
