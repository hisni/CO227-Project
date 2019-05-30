import React from 'react'
import { Text, View, Button, ScrollView,StyleSheet,Image,TouchableOpacity } from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import call from 'react-native-phone-call';
import Icon from 'react-native-vector-icons/Feather';

class Vendor extends React.Component {

  state={
    vendor: null,
    isProfileReady: false
  }
  componentDidMount() {
    fetch('https://co227-project.firebaseio.com/Posts/'+this.props.itemId+'.json')
    .then(res => res.json())
    .then(parsedRes => {
      this.setState({
        vendor: parsedRes,
        isProfileReady: true
      })
      console.log(parsedRes);
    })
    .catch(err => console.log(err));
  };

  call = (num) => {
    //handler to make a call
    const args = {
      number: num,
      prompt: false,
    };
    call(args).catch(console.error);
  };

  render(){
    let show=<View>
                <Text></Text>
                <Text></Text>
                <BarIndicator/>
              </View>
    if(this.state.isProfileReady){
      show=<ScrollView>
        <View style={styles.container}>
            <View style={styles.header}>
              <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
            </View>
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <Text style={styles.name}>{this.state.vendor.postData.Title}</Text>
                <Text style={styles.info}>{this.state.vendor.postData.Type}</Text>
                <Text style={styles.description}>{this.state.vendor.postData.Discription}</Text>
                <TouchableOpacity style={styles.buttonContainer} onPress={()=>this.call(this.state.vendor.postData.ContactNo)}>
                  <Icon style={{marginRight: 7}} name='phone-call' size={20}/>
                  <Text style={{marginBottom: 0, paddingBottom: -100}}>{this.state.vendor.postData.ContactNo}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                  <Icon style={{marginRight: 7}} name='map-pin' size={20}/>
                  <Text style={{marginTop: 0}}>{this.state.vendor.postData.Address}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
    }

    return(
      <View>
        {show}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  container:{
    backgroundColor: '#b3ffcc',
  },
  header:{
    backgroundColor: "#b3ffcc",
    height:110,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:20
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#006600",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    width:250,
    borderRadius:30,
    backgroundColor: "#b3ffcc",
  },
});

export default Vendor
