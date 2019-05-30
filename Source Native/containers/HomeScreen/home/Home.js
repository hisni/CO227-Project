import React from 'react';
import { Button, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Logo from '../../../assets/images/Logo'
import Post from '../../../components/common/post/Post'
import {BarIndicator} from 'react-native-indicators';
import RNRestart from 'react-native-restart';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <Logo/>,
    headerRight: (
      <Button
        onPress={() => alert("Button pressed")}
        title="Post Add"
        color="#006600"
      />
    ),
  };

  state={
    posts: [],
    postReady: false,
    loading: true
  }

  componentDidMount() {
    fetch('https://co227-project.firebaseio.com/Posts.json')
    .then(res => res.json())
    .then(parsedRes => {
      const postArray=[];
      for (const key in parsedRes){
        postArray.push({
          district : parsedRes[key].District,
          title: parsedRes[key].postData.Title,
          id : key
        });
      }
      this.setState({
        posts: postArray,
        postReady: true
      });
    })
    .catch(err =>
      {
        console.log(err);
        this.setState({
          loading: false
        })
      }
    );
  };

  postClicked=(id)=>{
    this.props.navigation.navigate('VendorProfile', {
        itemId: id
    })
  }

  reloadBundleHandler=()=>{
    RNRestart.Restart();
  }

  render(){
    let posts=<View>
                <Text></Text>
                <Text></Text>
                <BarIndicator/>
              </View>

    if (!this.state.loading){
      posts=<View>
                  <Text></Text>
                  <Text>Ooops! Something went wrong</Text>
                  <Text>Try again</Text>
                  <Button title="reload" onPress={this.reloadBundleHandler}></Button>
              </View>
    }
    if(this.state.postReady){
      posts=this.state.posts.map(item => (
        <Post key={item.id}
              postClicked={()=>this.postClicked(item.id)}
              district={item.district}
              name={item.title}
        />
      ));
    }

    return(
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {posts}
        </View>
      </ScrollView>
    )
  }
}
