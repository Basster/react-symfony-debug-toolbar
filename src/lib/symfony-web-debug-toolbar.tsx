import React, { FC } from 'react'
import symfonyLogo from './assets/symfony.svg'
import { AjaxInfo } from './ajax-info.js'
import { RequestsProvider } from './requests.js'
import { RequestsTable } from './requests-table'
import styled from 'styled-components'

const StyledWebDebugToolbar = styled.div`
  background-color: #222;
  color: #eee;
  border-top-left-radius: 4px;
  height: 36px;
  position: fixed;
  padding: 6px;
  right: 0;
  bottom: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
`

interface WebDebugToolbarProps {
  tokenLinkHeader?: string
  tokenHeader?: string
}

export const SymfonyWebDebugToolbar: FC<WebDebugToolbarProps> = ({
  tokenHeader = 'x-debug-token',
  tokenLinkHeader = 'x-debug-token-link',
}) => {
  return (
    <StyledWebDebugToolbar>
      <RequestsProvider tokenHeader={tokenHeader} tokenLinkHeader={tokenLinkHeader}>
        <AjaxInfo />
        <RequestsTable />
      </RequestsProvider>

      <img width={24} height={24} src={symfonyLogo} alt='Symfony Debug Toolbar' />
    </StyledWebDebugToolbar>
  )
}
