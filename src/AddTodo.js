import { addDoc, collection } from "firebase/firestore"
import { db } from './index'
import { useState } from "react"

export default function AddTodo() {
  const [ content, setContent ] = useState('')
  
  return (
    <>
      <form onSubmit={async(e) => {
        e.preventDefault()
        await addDoc(collection(db, 'todos'), {
          content
        })
      }}>
        <label>New Todo: </label>
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)}/>
      </form>
    </>
  )
}