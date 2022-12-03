import React, { FC } from 'react'
import { useRequests } from './requests.js'
import styled from 'styled-components'
import * as ajaxLogo from './assets/ajax.svg'
import { StyledImg } from './styled-components'

interface CounterProps {
  count: number
}

const SfToolbarValue: FC<CounterProps> = ({ count }) => {
  return count > 0 ? <span>{count}</span> : null
}

const SfToolbarIcon = styled.div`
  display: flex;
  align-content: center;
`

export const AjaxInfo: FC = () => {
  const { responses } = useRequests()
  return (
    <SfToolbarIcon className='sf-toolbar-icon'>
      <StyledImg width={24} height={24} src={ajaxLogo.default} alt='Ajax Request Info' />
      <SfToolbarValue count={responses.length} />
    </SfToolbarIcon>
  )
}
