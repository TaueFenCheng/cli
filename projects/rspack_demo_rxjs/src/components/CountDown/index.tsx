import React, {useEffect, useState} from 'react'

export default function (props: {
  count: number
}) {
  const [cout, setCout] = useState(props.count)
  useEffect(() => {
    let time: number | null | undefined = null
    time = setInterval(() => {
      setCout((prev: any) => prev - 1)
      if (!cout) {
        time && clearInterval(time)
      }
    }, 1000)
  }, [cout])
  return <div>{cout}</div>
}
