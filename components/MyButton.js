import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

export default class MyButton extends Component {
    render() {
        return (
            <Button 
            title='Translate' 
            onPress={this.props.translate}/>
        )
    }
}

