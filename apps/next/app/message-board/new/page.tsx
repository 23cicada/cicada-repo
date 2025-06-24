'use client'
import { useActionState } from 'react'
import { create } from '../action'

const MessageBoardForm: React.FC = () => {
  const [errorMessage, action, isPending] = useActionState(create, '')

  return (
    <form action={action}>
      <div>
        <label>
          Name: <input name="username" />
        </label>
      </div>
      <div>
        <label>
          Message: <input name="text" />
        </label>
      </div>
      <button disabled={isPending} type="submit">
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  )
}

export default MessageBoardForm
