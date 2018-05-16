import React, { Component } from 'react';
import { ActivityIndicator,View, Text, ScrollView, TouchableOpacity, Dimensions, Linking } from 'react-native';
import HTML from 'react-native-render-html';
import EXAMPLES, * as snippets from './snippets';
import styles from './styles';

const IMAGES_MAX_WIDTH = Dimensions.get('window').width - 100;
const CUSTOM_STYLES = {};
const CUSTOM_RENDERERS = {};
const DEFAULT_PROPS = {
    htmlStyles: CUSTOM_STYLES,
    renderers: CUSTOM_RENDERERS,
    imagesMaxWidth: IMAGES_MAX_WIDTH,
    onLinkPress: (evt, href) => { Linking.openURL(href); },
    debug: true
};

export default class DetailContent extends Component {
    constructor(props){
        super(props);
        this.state = {
        timePassed: false
        };
      }
      
      componentDidMount() {
        setTimeout( () => {
           this.setTimePassed();
        },500);
      }
      
      setTimePassed() {
         this.setState({timePassed: true});
      }
      
      
      render() {
        const contentDetail = this.props.navigation.getParam('detailContent', 'detail Content default if can not get');
    
      if (!this.state.timePassed){
        return <ActivityIndicator animating hidesWhenStopped={true} size={'large'}/>
      }else{

           
        return (
            <ScrollView style={styles.container}>
            
            <HTML
              {...DEFAULT_PROPS}
              html={contentDetail}
         
            />
            
            </ScrollView> 
        
        );
    }
    }
}


