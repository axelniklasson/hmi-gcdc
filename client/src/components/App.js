import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/App'

import Top from './Top'
import Bottom from './Bottom'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div styleName="container">
        <div styleName="top">
          <Top />
        </div>
        <div styleName="bottom">
          <Bottom />
        </div>
      </div>
    )
  }
}

export default CSSModules(App, styles)
