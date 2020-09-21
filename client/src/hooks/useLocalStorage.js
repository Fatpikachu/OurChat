import { useEffect, useState} from 'react'


export default function useLocalStorage(key, initialValue){
  console.log('got in uselocal storageee ')
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key)
    if(jsonValue !== null) return JSON.parse(jsonValue)
    if(typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue || null
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}