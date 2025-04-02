import { View, Text,Image } from 'react-native'
import React from 'react'
import { icons } from "../../constants/icons";

const saved = () => {
  return (
    <View style={{flex:1, backgroundColor: "#0f0D10", alignItems:"center", justifyContent:"center"}}>
      <Image style={{marginBottom:10, height:28 , width: 30}} source={icons.save} />
      <Text style={{color:"#D3D3D3", fontWeight:"bold"}}>No movie is saved</Text>
    </View>
  )
}

export default saved