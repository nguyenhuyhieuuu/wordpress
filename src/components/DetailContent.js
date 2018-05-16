import React, { Component } from 'react';
import { Text,StyleSheet,View,ScrollView, Image,  Dimensions} from 'react-native';
import { createStackNavigator } from 'react-navigation'; 
import HTML from 'react-native-render-html';
import { Button } from 'react-native-elements';

const IMAGES_MAX_WIDTH = Dimensions.get('window').width - 50;
const CUSTOM_STYLES = {};
const CUSTOM_RENDERERS = {
   
    b: () => <Text style={{color: 'red', fontSize: 50}}>tui ne</Text>
};
const DEFAULT_PROPS = {
    htmlStyles: CUSTOM_STYLES,
    renderers: CUSTOM_RENDERERS,
    imagesMaxWidth: IMAGES_MAX_WIDTH,
    onLinkPress: (evt, href) => { Linking.openURL(href); },
    debug: true
};



export default class DetailContent extends Component {
    state = {  }
    render() {
        const { navigation } = this.props;
        const contentDetail = navigation.getParam('detailContent', 'detail Content default if can not get');
   
        return (
            <View style={{flex: 1}}>
                <ScrollView >
                <View style={styles.container}>
                    <HTML 
                        {...DEFAULT_PROPS}
                    
                    html={contentDetail} 
                    />
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