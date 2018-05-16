import React, { Component } from 'react';

import { SafeAreaView,View, Text } from 'react-native';

export default class Posts extends Component {
    constructor() {
      super();
      this.state = {
        posts: []
      }
    }
  componentDidMount() {
      let dataURL = "http://localhost/wordpress/wp-json/wp/v2/posts";
      fetch(dataURL)
        .then(response => response.json())
        .then(response => {
          this.setState({
            posts: response
          })
        })
    }
  render() {
      console.log(this.state.posts);
      let posts = this.state.posts.map((post, index) => {
        return (
        <View key={index}>
        <Text>Title: {post.title.rendered}</Text>
        </View>)
      } );
  return (
        <SafeAreaView>
          <Text>List Of Posts</Text>
          {posts}
        </SafeAreaView>
       )
    }
  }