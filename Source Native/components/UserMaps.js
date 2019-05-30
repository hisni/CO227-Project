import React from 'react'
import {View, StyleSheet} from 'react-native'
import MapView from 'react-native-maps'

const UserMaps = (props) => {
  let userLocationMarker = null

  if (props.userLocation){
    userLocationMarker = <MapView.Marker coordinate={props.userLocation}/>
  }

  const userMarkers = props.userPlaces.map(userPlace=>
    <MapView.Marker coordinate={userPlace} key={userPlace.id}/>
  )

  return (
    <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude : 7.4705011,
            longitude :  80.6345993,
            latitudeDelta : 0.562,
            longitudeDelta : 0.5421
          }}
          region={props.userLocation}
        >
          {userLocationMarker}
          {userMarkers}
        </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: 200,
        marginTop: 20
    },
    map:{
        width: '100%',
        height: '100%'
    }
})

export default UserMaps
