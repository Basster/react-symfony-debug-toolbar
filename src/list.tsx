import React, { FC, useCallback, useEffect, useState } from 'react'

export const List: FC = () => {
  const [list, setList] = useState<number[]>([])

  const getList = useCallback(async () => {
    const data = await fetch('https://127.0.0.1:8000/list?try=' + Math.random() * 10)
    const json = await data.json()

    setList(json)
  }, [])

  useEffect(() => {
    getList().catch(console.error)
  }, [])

  if (list.length === 0) {
    return null
  }

  return (
    <>
      <ul>
        {list.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <button type='button' onClick={getList}>
        Reload
      </button>
    </>
  )
}
