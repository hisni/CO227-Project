import React from 'react'
import { Button } from 'react-native'

const FetchLocation = (props) => {
  return (
    <Button title={props.name} onPress={props.clicked}></Button>
  )
}

export default FetchLocation
