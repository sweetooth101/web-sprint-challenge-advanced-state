import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export  function Message(props) {
  return <div id="message">{props.infoMessage.message}</div>
}

export default connect(state => state, actionCreators)(Message)
