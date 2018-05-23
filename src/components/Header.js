import React, { Component } from 'react';
import { TouchableOpacity,StyleSheet,View, Text, Image } from 'react-native';
import iconLeft from '../images/iconLeft.png';
import iconRight from '../images/iconRight.png';


export default class Header extends Component {
    static defaultProps = {
       iconLeft,
       iconRight,
       titleWebsite: 'nguyenhuyhieu.com'

      };
    render() {
        return (
            <View>
            <View style={styles.container}>
                <TouchableOpacity onPress={() =>{} }>
                        <Image style= {styles.iconLeft}
                        source={this.props.iconLeft}/>
                        </TouchableOpacity>
                        
                        <Text style={styles.titleWebsite}>
                            {this.props.titleWebsite}
                        </Text>
                        <TouchableOpacity onPress={() =>{} }>       
                        <Image style={styles.iconRight} source={this.props.iconRight}/>
                      </TouchableOpacity>  
                 </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
            
            flexDirection: 'row',
            backgroundColor: '#09b3ff',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 5,
           },
    iconLeft: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    titleWebsite: {
        color: 'white'
    },
    iconRight: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    }

   }
);

