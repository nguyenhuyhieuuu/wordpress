import React, { Component } from "react";
import {
  Text,
  Dimensions,
  View,
  FlatList,
  Platform,
  Image,
  RefreshControl,
  AppRegistry,
  SafeAreaView,
  SearchBar,
  ActivityIndicator
} from "react-native";
import { Header,Card, Icon, Button, List, ListItem } from "react-native-elements";
import HTML from "react-native-render-html";
import { createStackNavigator } from 'react-navigation'; // Version can be 
import { getStatusBarHeight } from 'react-native-status-bar-height';

var statusBarHeight = getStatusBarHeight();


import DetailContent from './components/DetailContent';
import config from "./config/config";

import no_image from './images/no_image.png';


const windowSize = Dimensions.get('window');

 class HomeScreen extends Component {
  constructor(props) {
    super(props);
   

    this.state = {
      loading: false,
      data: [],
      page: 1,
      refreshing: false,
      siteTitle: "",
      totalPost: 0,
      featuredMedia: "",
    };
  }


  // getImage(idFeaturedMedia) {
  //   const urlFeaturedMedia = config.url+"/wp-json/wp/v2/media/"+idFeaturedMedia;
  //   fetch(urlFeaturedMedia)
  //   .then(
  //     res => {
  //       return res.json();
  //     }
  //   )
  //   .then(
  //     resJson => {
  //       this.setState({
  //         featuredMedia: resJson.guid.rendered
  //         });
  //         console.log("anh nè: "+resJson.guid.rendered);
       
  //       })
  //     .catch(error => {
  //         console.log(error);
         
  //       });
  //    return this.state.featuredMedia;
  // }
  fetchData = () => {
    const { page } = this.state;
    //alert(config);
    //đối với máy android thì để localhost nó không nhận dc mà phải sửa thành IP v4 của wifi hay mạng đang kết nối
   
    const url = config.url+"/wp-json/wp/v2/posts/?page="+page;

    this.setState({ loading: true });
    fetch(url,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-WP-Total' : 'application/json'
        }
      }
    )
      .then(res => {
         
          this.setState({
              totalPost:  res.headers.get('x-wp-total')
          });

          return res.json();

      })
      .then(resJson => {

       
     //sử dụng dòng này nếu muốn load danh sách danh sách post mới vẫn dữ lại post cũ
     //const arrayData = [...this.state.data, ...resJson];
     
        this.setState({
        //data: page === 1 ? resJson : arrayData,
        data: resJson,
          loading: false,
          refreshing: false
        });
     
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  

  componentDidMount() {
    
    const urlSiteDetail = config.url+"/wp-json";
    fetch(urlSiteDetail)
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({
          siteTitle: res.name
        });
        
      })
      .catch(error => {});

    this.fetchData();
   
  }

  // renderHeader = () => {
    
  //   return (
  //     <Text
  //       style={{
  //         alignSelf: "center",
  //         color: "red",
  //         fontWeight: "bold",
  //         fontSize: 20,
  //         marginBottom: 0
  //       }}
  //     >
  //       {this.state.siteTitle}
  //     </Text>

    
      
  //   );
   
  // };
  // renderFooter = () => {

  //   return (
  //     <View
  //       style={{
  //         paddingVertical: 5,
  //         borderTopWidth: 1,
         
  //       }}
  //     > 
  //         <ActivityIndicator animating={this.state.loading} size={'small'} />
  //     </View>
  //   );
  // };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true
      },
      () => {
        this.fetchData();
      }
    );
  };

  handleLoadMore = () => {
    console.log("so bai viet là:" + this.state.totalPost);
    var pageMax = Math.round(this.state.totalPost/10);
    var pageMaxResidual = this.state.totalPost%10;

    if(pageMaxResidual > 0) {
      pageMax += 1;
    }
  
    console.log("so trang là: " + pageMax);
   if (this.state.page < pageMax){
    this.setState(
      {
        page: this.state.page + 1,
        // loading: true
      },
      () => {
        this.fetchData();
      }
    );
   }
   else {
   
   }

   
  };

  
  render() {
    {statusBarHeight =  Platform.OS === 'ios'? getStatusBarHeight() : 0 }
    
    return (
     
      <View style={{paddingTop: statusBarHeight , flex: 1 } }>
         <Header
  leftComponent={{ icon: 'menu', color: '#fff' }}
  centerComponent={{ text: this.state.siteTitle, style: { color: '#fff' } }}
  rightComponent={{ icon: 'home', color: '#fff' }}
/>
    {
      this.state.loading ? <ActivityIndicator animating size={'large'} /> :
       <FlatList 
      style={{flex: 1}}
        data={this.state.data}
        keyExtractor={item => item.id.toString()}
        // ListHeaderComponent={this.renderHeader}
         //ListFooterComponent={this.renderFooter}

        renderItem={({ item }) => {
        
        const nam = item.date.substring(0,4);
        const thang = item.date.substring(5,7);
        const ngay = item.date.substring(8,10);
        
      //  const hinhanh = item.better_featured_image === null? no_image: {uri: item.better_featured_image.source_url};     

        //  var featuredMediaNe = this.getImage(item.featured_media);
         
        //  const hinhanh = featuredMediaNe === null? no_image: {uri: featuredMediaNe};     

         

            return (
              <View>
                <Card
                 containerStyle={{margin: 5}}
                  title={item.title.rendered}
                  
                >
               
                   {/* <Image style={{width: windowSize.width/1.2, height: windowSize.width/2}} source={ hinhanh}  /> */}
   
                         <HTML html = {item.excerpt.rendered}/>
                 
                  <View style={{ flex: 1, flexDirection: 'row'}}>
                    <Button
                      icon={<Icon name="code" color="#ffffff" />}
                      backgroundColor="#03A9F4"
                      buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0,
                        width: 120
                      
                      }}
                      title={ngay + "-"+ thang + "-" + nam }
                      onPress={() => alert('hieune')} 
                    />
                    <Button
                      icon={<Icon name="code" color="#ffffff" />}
                      backgroundColor="#03A9F4"
                      buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0,
                        width: 120
                      
                      }}
                      title="Xem chi tiết"
                      onPress={() => {this.props.navigation.navigate('Detail', {detailContentNe: item.content.rendered}) } }
                    />
                  </View>
                 
                  
                </Card>
                <View
                  style={{
                    height: 1,

                    backgroundColor: "#CED0CE"
                  }}
                />
              </View>
            );
        }}
        ref= "listPosts"
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0.1}
      />
    }
        
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
     }
    },
    Detail: {
      screen: DetailContent,
      navigationOptions: {
         title: 'Chi tiết bài viết'
     }
    },
  },
  {
    initialRouteName: 'Home',
    
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}