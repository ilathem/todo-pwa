import { getDocs, query, collection, disableNetwork, enableNetwork, deleteDoc, doc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useEffect, useState } from 'react';

import { db } from './index'

export default function Todos() {

  const [status, setStatus] = useState('')

  const [ todos, loading, error, snapshot ] = useCollectionData(collection(db, 'todos'))

  const goOffline = async () => {
    await disableNetwork(db)
    setStatus('offline')
  }

  const goOnline = async () => {
    await enableNetwork(db)
    setStatus('online')
  }
  
  useEffect(() => {
    goOffline()
  }, [])

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


      
      <button onClick={goOffline}>Go offline</button>
      <button onClick={goOnline}>Go online</button>
    </>
  )
}