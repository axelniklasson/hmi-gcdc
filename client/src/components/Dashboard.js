import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/Dashboard'

import Speed from './Speed'
import InfoActions from './InfoActions'
import Accelerometer from './Accelerometer'

class Dashboard extends Component {
    render() {
        var { speed, acceleration, egoFlags } = this.props;

        return (
            <div styleName="container">
                <Speed speed={speed} />
                <InfoActions egoFlags={egoFlags} />
                <Accelerometer acceleration={acceleration} egoFlags={egoFlags} />
            </div>
        )
    }
}

export default CSSModules(Dashboard, styles)
