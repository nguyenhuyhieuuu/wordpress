import React, { Component } from 'react';
import { Text,StyleSheet,View,ScrollView, Image,  } from 'react-native';
import { createStackNavigator } from 'react-navigation'; 
import HTML from 'react-native-render-html';
import { Button } from 'react-native-elements';

export default class DetailContent extends Component {
    state = {  }
    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('detailContentNe', 'detail Content default if can not get');
   
        return (
            <View style={{flex: 1}}>
                <ScrollView >
                <View style={styles.container}>
                    <HTML html={itemId} />
                    </View>
                    
                </ScrollView>
                <Button  title="Trở về" onPress={() => {this.props.navigation.goBack() } } />
            
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      

    }

});