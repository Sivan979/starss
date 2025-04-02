import { View, Text,Image } from 'react-native'
import React from 'react'
import { icons } from "../../constants/icons";


const profile = () => {
  return (
    <View style={{flex:1, backgroundColor: "#0f0D10", alignItems:"center", justifyContent:"center"}}>
      <Image style={{height:28 , width: 30, marginBottom:10}} tintColor="#Fff" source={icons.person} />
      <Text style={{color:"#D3D3D3", fontWeight:"bold"}}>No profiel</Text>
    </View>
  )
}

export default profile