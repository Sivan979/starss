import { View, Text, ImageBackground, Image, ImageBackgroundBase } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import {images} from '../../constants/images';
import { icons } from "../../constants/icons";


const TabIcons = ({focused, icon, title}) => {
    if (focused){
        return(
            <ImageBackground source={images.highlight} style={{
                width: "100%",
                flex: 1, 
                flexDirection: "row", 
                minWidth: 110, 
                minHeight: 53,
                marginTop: 12, 
                justifyContent:"center", 
                alignItems:"center",
                borderRadius: 50,
                overflow:"hidden"
            }}>
                <Image source={icon} tintColor="#151312" style={{ }} />
                <Text style={{marginLeft: 5, fontWeight:"600", fontSize: 15}}>{title}</Text>
            </ImageBackground>
        )
    }
    
    return(
        <View style={{ marginTop: 10, justifyContent:"center", alignItems:"center", width:"100%", height:"100%"}}>
            <Image source={icon} style={{tintColor: "#ddd",}}/>
        </View>
    )
}

const _layout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
            },
            tabBarStyle:{
                backgroundColor: '#0f0D23',
                borderRadius: 50,
                marginHorizontal: 20,
                marginBottom: 36,
                height: 52,
                position: "absolute",
                overflow: "hidden",
                borderWidth: 1,
                borderColor: '0f0d23'

            }
        }}
    >
        <Tabs.Screen name='index' 
            options={{title:'Home', headerShown:false, tabBarIcon: ({focused}) => ( 

                <TabIcons focused={focused} icon={icons.home} title="Home" />
            ) }}
        />

        <Tabs.Screen name='search' 
            options={{title:'Search', headerShown:false, tabBarIcon: ({focused}) => ( 

                <TabIcons focused={focused} icon={icons.search} title="Search" />
            ) }}
        />

        <Tabs.Screen name='saved' 
            options={{title:'Saved', headerShown:false, tabBarIcon: ({focused}) => ( 

                <TabIcons focused={focused} icon={icons.save} title="Saved" />
            ) }}       
        />

        <Tabs.Screen name='profile' 
            options={{title:'Profile', headerShown:false, tabBarIcon: ({focused}) => ( 

                <TabIcons focused={focused} icon={icons.person} title="Profile" />
            ) }}
        />

    </Tabs>
  )
}

export default _layout