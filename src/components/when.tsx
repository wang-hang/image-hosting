import  * as React from 'react'

const { Fragment } = React
interface Props {
  condition: boolean
}
const When: React.FunctionComponent<Props> = (props) => {
  const { condition, children } = props

  return (
  <Fragment>{condition && children}</Fragment>
  )
}

export default When
