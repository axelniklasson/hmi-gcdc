import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/Dashboard'

import Speed from './Speed'
import InfoActions from './InfoActions'
import Accelerometer from './Accelerometer'

class Dashboard extends Component {
    render() {
        var { speed, acceleration, flags } = this.props;

        return (
            <div styleName="container">
                <Speed speed={speed} />
                <InfoActions flags={flags} />
                <Accelerometer acceleration={acceleration} flags={flags} />
            </div>
        )
    }
}

export default CSSModules(Dashboard, styles)
