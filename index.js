import { AppRegistry } from 'react-native';
import App from './src/App';
import DetailContent from './src/components/DetailContent';

import React, { Component } from 'react';

export default class Main extends Component {
    state = {  }
    render() {
        return (
            <Video ratio={3/4 *100} source="https://www.youtube.com/watch?v=0wCC3aLXdOw"/>
        );
    }
}

AppRegistry.registerComponent('wordpress', () => App);
