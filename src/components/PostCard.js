import React, { Component } from 'react';
import { Dimensions,Image,StyleSheet,View, TouchableOpacity, Text } from 'react-native';

const {width} = Dimensions.get('window');


export default class PostCard extends Component {
    state = {  }
    render() {
        return (
            <View style={styles.container}>
            <TouchableOpacity onPress={this.props.handleDetail}  >
  
                    <Text style={styles.title}>
                        {this.props.title}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.viewFeaturedMedia}>
                  <Image resizeMode="contain" source = {this.props.featuredMedia} style={styles.featuredMedia}/>
                  </View> 
               
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        padding: 5,
        backgroundColor: 'white',
    },
    title : {
        fontSize: 18,
        color: '#07a7ff',
    },
    viewFeaturedMedia:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewDatePost: {
        alignItems: 'flex-end',
    }
    ,
    featuredMedia: {
        width: width/1.2,
        height: width/2,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'silver',
        margin: 5
    },
    excerptPost: {
        padding: 5
    }



});


