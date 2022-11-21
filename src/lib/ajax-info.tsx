import ajaxLogo from './assets/ajax.svg'
import React, { FC } from 'react'
import { useRequests } from './requests.js'

interface CounterProps {
  count: number
}

const Counter: FC<CounterProps> = ({ count }) => {
  return count > 0 ? <span>({count})</span> : null
}

export const AjaxInfo: FC = () => {
  const { responses } = useRequests()
  return (
    <span style={{ margin: '0 6px' }}>
      <img width={24} height={24} src={ajaxLogo} alt='Ajax Request Info' />
      <Counter count={responses.length} />
    </span>
  )
}
