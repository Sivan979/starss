import { View, Text ,Image, FlatList, ActivityIndicator} from 'react-native'
import React from 'react'
import { images } from "@/constants/images";
import MovieCard from "@/components/moviecard";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";

const search = () => {
  const router = useRouter();

  const {data: movies, loading, error} = useFetch( () => fetchMovies({query: ''}))


  return (
    <View style={{flex: 1, backgroundColor: "#0f0D10"}}>
      <Image style={{flex:1, position:"absolute" ,width: "100%", zIndex:0,  }} resizeMode='cover' source={images.bg}/>

      <FlatList 
        data={movies}
        renderItem={({item}) => (
          <MovieCard movie={item}/>
        )}
        keyExtractor={(item) => item.id.toString()}
        style={{padding: 10}}
        numColumns={3}
        columnWrapperStyle={{justifyContent:"center", gap:16, marginVertical:18 }}
        contentContainerStyle={{paddingBottom:100}}
        ListHeaderComponent={
          <>
            <View style={{width:"100%", flexDirection:"row", justifyContent:"center", alignItems:"center", marginTop:80}}>
              <Image style={{width: 40,  marginBottom: 20,}} source={icons.logo}/>
            </View>

            <View style={{marginVertical:20}}>
              <SearchBar placeholder="search for movies..."/>
            </View>
            {
              loading && (
                <ActivityIndicator size="large" color="#0000ff" style={{marginTop: 50, alignSelf: "center"}} />
              )
            }
          </>
        }
      />

    </View>
  )
}

export default search