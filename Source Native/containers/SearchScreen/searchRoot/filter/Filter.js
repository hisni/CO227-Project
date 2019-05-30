import React, { Component } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';
import {BarIndicator} from 'react-native-indicators';
import Post from '../../../../components/common/post/Post'

export default class Demo extends Component {
  static navigationOptions = {
    //To hide the ActionBar/NavigationBar
    header: null,
  };

  state = {
    text: '',
    districts: ['District','Matale','Kandy','Nuwara Eliya','Kurunegala','Puttalam','Colombo','Kaluthara','Gampaha','Badulla','Ampara','Batticaloa','Jaffna','Kegalle','Mannar','Monaragala','Mullaitivu','Trincomalee','Vavuniya','Galle','Matara','Hambantota'],
    posts: [],
    types: [],
    selectedDist: 'District',
    selectedType : 'Type',
    selectedId: null,
    postReady: false,
    loading: true
  };

  componentDidMount() {
    fetch('https://co227-project.firebaseio.com/Posts.json')
    .then(res => res.json())
    .then(parsedRes => {
      const typeArray=['Type'];
      const postArray=[];
      for (const key in parsedRes){
        postArray.push({
          district : parsedRes[key].District,
          title: parsedRes[key].postData.Title,
          type: parsedRes[key].postData.Type,
          id : key
        });

        let add= true;
        for (const item in typeArray){
          if (parsedRes[key].postData.Type.toLowerCase()===typeArray[item].toLowerCase()){
            add=false;
          }
        }

        if (add){
            typeArray.push(parsedRes[key].postData.Type)
        }
      }
      this.setState({
        posts: postArray,
        types: typeArray,
        postReady: true
      });
    })
    .catch(err => {
      console.log(err)
      this.setState({
        loading: false
      })
    });
  };

  postClicked=(id)=>{
    this.props.navigation.navigate('VendorProfile', {
        itemId: id
    })
  }

  reloadHandler=()=>{
    this.componentDidMount();
    this.setState({
      loading: true
    })
  }

  render() {
    const data = [this.state.districts, this.state.types];

    let posts=<BarIndicator/>
    if (!this.state.loading){
      posts=<View style={{marginTop: '40%', alignItems: 'center', alignContent: 'space-around'}}>
                  <Text style={{marginBottom: '5%'}}>Ooops! Something went wrong</Text>
                  <Button color="#ff5c5c" title="try again" onPress={this.reloadHandler}></Button>
            </View>
    } else if(this.state.postReady){
      posts=this.state.posts.map(item => {
        if((item.district===this.state.selectedDist || this.state.selectedDist=='District')
            && (item.type.toLowerCase()===this.state.selectedType.toLowerCase() || this.state.selectedType=='Type')){
          return(
            <Post key={item.id}
                  postClicked={()=>this.postClicked(item.id)}
                  district={item.district}
                  name={item.title}
            />
          )
        }
      });
    }



    return (
      <View style={{flex: 1}}>
        <DropdownMenu
          style={{flex: 1, zIndex: 200}}
          bgColor={'white'}
          tintColor={'#666666'}
          activityTintColor={'green'}
          handler={(selection, row) => {
            {if(selection==0){
              this.setState({
                selectedDist: data[0][row]
              })
            } else {
              this.setState({
                selectedType: data[1][row]
              })
            }
            }
          }}
          data={data}
          maxHeight={310}
          >
          <ScrollView>
            <View style={{flex: 1, alignItems: 'center', zIndex: 150}}>
              {posts}
            </View>
          </ScrollView>
        </DropdownMenu>
      </View>
    );
  }
}
