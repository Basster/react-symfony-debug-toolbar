import React, { FC } from 'react'
import { useRequests } from './requests.js'
import styled from 'styled-components'

interface ContainerProps {
  hasRequests: boolean
}

const Container = styled.div`
  background-color: #222222;
  color: #eeeeee;
  font-size: 0.8rem;
  display: ${(props: ContainerProps) => (props.hasRequests ? 'block' : 'none')};
  padding: 10px;
  max-width: 525px;
  max-height: 480px;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  bottom: 36px;
  right: 0;
`

const UrlTd = styled.td`
  max-width: 250px;
  line-height: 9px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: nowrap;
`

const A = styled.a`
  color: #99cdd8;
  text-decoration: underline;
`

export const RequestsTable: FC = () => {
  const { responses, hasResponses, reset } = useRequests()

  if (!hasResponses) {
    return null
  }

  const getTitle = (length: number) => `${length} AJAX request${length > 1 ? 's' : ''}`

  return (
    <Container hasRequests={hasResponses}>
      <header>
        {getTitle(responses.length)} (
        <A href='#' onClick={() => reset()}>
          Clear
        </A>
        )
      </header>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Profile</th>
            <th>Method</th>
            <th>Type</th>
            <th>Status</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((elem, idx) => {
            return (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>
                  <A href={elem.profiler} target='_blank'>
                    {elem.token}
                  </A>
                </td>
                <td>{elem.method}</td>
                <td>{elem.type}</td>
                <td>{elem.status}</td>
                <UrlTd title={elem.url}>
                  <A href={elem.url} target='_blank'>
                    {elem.url}
                  </A>
                </UrlTd>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Container>
  )
}
