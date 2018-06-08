import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  Text,
  ScrollView,
  Dimensions
} from "react-native";

import {
  BarIndicator
} from "react-native-indicators";

import HTMLView from "react-native-htmlview";

const { width, height } = Dimensions.get("window");

function renderNode(node, index, siblings, parent, defaultRenderer) {
  // ẩn nội dung
  if (node.name == "div") {
  }

  switch (node.name) {
    case "figure":
      return (
        <Image
          key={index}
          style={{
            width: width - 10,
            height: width - 100,
            resizeMode: "contain"
          }}
          source={{ uri: node.children[0].attribs.src }}
        />
      );
      break;
    case "div":
      if (node.attribs.id == "toc_container") {
        return null;
      }
      break;
    case "p":
      return (
        <Text key={index} style={{ color: 'black' }}>
          {defaultRenderer(node.children, parent)}
        </Text>
      );
      break;

    
    default:
      break;
  }
}

export default class DetailContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timePassed: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setTimePassed();
    }, 1000);
  }

  setTimePassed() {
    this.setState({ timePassed: true });
  }

  render() {
    var contentDetail = this.props.navigation.getParam(
      "detailContent",
      "detail Content default if can not get"
    );
    console.log("NOI DUNG HTML NÈ:" + contentDetail);
     if (!this.state.timePassed){
      return < BarIndicator animationDuration={1000} count={5} size={30} color="#06beff"/>
     }
     else
     {

     return (
      <ScrollView style={styles.container}>
        <HTMLView
          style={styles.htmlContent}
          value={contentDetail}
          renderNode={renderNode}
          onLinkPress={url => console.log("clicked link: ", url)}
        />
      </ScrollView>
    );
  }

 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  htmlContent: {
    padding: 5
  }
});
