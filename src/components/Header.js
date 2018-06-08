import React, { Component } from 'react';
import { TouchableOpacity,StyleSheet,View, Text, Image } from 'react-native';
import icon_left from '../images/icon_left.png';
import icon_right from '../images/icon_right.png';

export default class Header extends Component<Props> {
    static defaultProps = {
       icon_left,
       icon_right,
       titleWebsite: 'nguyenhuyhieu.com',
      };
    render() {
        return (
            <View>
            <View style={styles.container}>
                <TouchableOpacity onPress={() =>{} }>
                        <Image style= {styles.icon_left}
                        source={this.props.icon_left}/>
                        </TouchableOpacity>
                        
                        <Text style={styles.titleWebsite}>
                            {this.props.titleWebsite} {this.props.Hieu}
                        </Text>
                        <TouchableOpacity onPress={() =>{} }>       
                        <Image style={styles.icon_right} source={this.props.icon_right}/>
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
    icon_left: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    titleWebsite: {
        color: 'white'
    },
    icon_right: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    }

   }
);

