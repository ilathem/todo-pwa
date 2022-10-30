import { getDocs, query, collection, disableNetwork, enableNetwork, deleteDoc, doc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useState } from 'react';

import { db } from './index'

export default function Todos() {

  const [status, setStatus] = useState('online')

  const [ todos, loading, error, snapshot ] = useCollectionData(collection(db, 'todos'))

  const deleteTodo = async(todoId) => {
    await deleteDoc(doc(db, 'todos', todoId))
  }

  return (
    <>
      <h1>Todos</h1>
      <p><i>{status}</i></p>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Todos loading...</span>}
      {todos && todos.map((todo, index) => {
        return <p onClick={() => deleteTodo(snapshot.docs[index].id)} key={snapshot.docs[index].id}>{todo.content}</p>
      })}


      
      <button onClick={async() => {
        await disableNetwork(db)
        setStatus('offline')
      }}>Go offline</button>
      <button onClick={async() => {
        await enableNetwork(db)
        setStatus('online')
      }}>Go online</button>
    </>
  )
}