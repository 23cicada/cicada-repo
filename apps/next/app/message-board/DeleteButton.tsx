'use client'

import { useState } from 'react'
import { remove } from './action'

const DeleteButton = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false)
  const handleDelete = async () => {
    const ok = confirm('Are you sure you want to delete this message?')
    if (ok) {
      setLoading(true)
      const errors = await remove(id)
      setLoading(false)
      if (errors) alert(errors)
    }
  }
  return (
    <button onClick={() => handleDelete()}>
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  )
}

export default DeleteButton
