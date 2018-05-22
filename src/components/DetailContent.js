import React, { Component } from 'react';
import {StyleSheet, Image,ActivityIndicator,View, Text, ScrollView, TouchableOpacity, Dimensions, Linking } from 'react-native';

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

import HTMLView from 'react-native-htmlview';

const {width, height} = Dimensions.get('window');

function renderNode(node, index, siblings, parent, defaultRenderer) {
// ẩn nội dung   
if(node.name === 'div'){
  if(node.attribs.id == 'toc_container'){
    return null;
  }
}

if (node.name === 'p') {

   return (

     <Text key={index} style={{color: 'blue'} }>
   {defaultRenderer(node.children, parent)}
     </Text>
     
   )
 }

  if (node.name === 'figure') {
    
    return (
         <Image key={index}
          style={{width: width - 50, height: width -100, resizeMode: 'contain'}}
          source={{uri: node.children[0].attribs.src}}
        />
      );
  }
  

  

  
}


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
        },1000);
      }
      
      setTimePassed() {
         this.setState({timePassed: true});
      }
      
      
      render() {
        var contentDetail = this.props.navigation.getParam('detailContent', 'detail Content default if can not get');
        console.log("NOI DUNG HTML NÈ:" +contentDetail);
      // if (!this.state.timePassed){
      //   return < BarIndicator animationDuration={1000} count={5} size={30} color="#06beff"/>
      // }else{

       // var contentDetailFinal = contentDetail.replace(/(\r\n|\n|\r)/gm,""); 
        return (
          <ScrollView style={styles.container}>
          <HTMLView style={styles.htmlContent} value={contentDetail} renderNode={renderNode} 
          onLinkPress={(url) => console.log('clicked link: ', url)}
          />
        </ScrollView>
        
        );
    }
  //  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  htmlContent: {
    padding: 5,
  }
});

