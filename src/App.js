import React, { Component } from "react";
import {
  Text,
  Dimensions,
  View,
  FlatList,
  Platform,
} from "react-native";

import { createStackNavigator } from 'react-navigation'; // Version can be 
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  BarIndicator,
} from 'react-native-indicators';

import PostCard from './components/PostCard';
import Header from './components/Header';

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
    };
  }

  fetchData = () => {
    const { page } = this.state;
    //alert(config);
    //đối với máy android thì để localhost nó không nhận dc mà phải sửa thành IP v4 của wifi hay mạng đang kết nối
   
    const url = config.url+"/wp-json/wp/v2/posts/?page="+page+"&_embed";

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
    //fetch để lấy tiêu đề của website
    const url = config.url+"/wp-json";
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({
          siteTitle: res.name.substring(0,20) //nếu tiêu đề dài quá thì cắt bớt từ 0, tới 19
        });


        
      })
      .catch(error => {});

    this.fetchData();
   
  }
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
   // console.log("so bai viet là:" + this.state.totalPost);
    var pageMax = Math.floor(this.state.totalPost/10); //Math.floor để làm tròn xuống
    var pageMaxResidual = this.state.totalPost%10;
    
    if(this.state.totalPost < 10) {
      pageMax =1; 
    }
    else 
    {
      if(pageMaxResidual > 0) {
      pageMax += 1;
    }
  }
  
   // console.log("so trang là: " + pageMax);
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
    titleWebsite={this.state.siteTitle} />
    
    {
      this.state.loading ? < BarIndicator animationDuration={1000} count={5} size={30} color="#06beff"/> :
       <FlatList 
      style={{flex: 1}}
        data={this.state.data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => {
        

          
        const yearPost = item.date.substring(0,4);
        const monthPost = item.date.substring(5,7);
        const dayPost = item.date.substring(8,10);
        const datePost = dayPost + "-" + monthPost + "-" + yearPost;
        const excerptLength = item.excerpt.rendered.length;
        const excerptContent = excerptLength > 200? item.excerpt.rendered.substring(0,200)+" ...": item.excerpt.rendered;
        
        const featuredMedia = item._embedded['wp:featuredmedia'][0].source_url == null ? no_image: {uri: item._embedded['wp:featuredmedia'][0].source_url};     
       
            return (
              <View>
                  <PostCard 
                  title={item.title.rendered}
                  featuredMedia={featuredMedia}
                   handleDetail={() => this.props.navigation.navigate('Detail', {detailContent: item.content.rendered })} 
                   excerpt={excerptContent} 
                   datePost={datePost}
                   
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