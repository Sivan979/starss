import { View, Text ,Image, FlatList, ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from "@/constants/images";
import MovieCard from "@/components/moviecard";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";

const search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const {data: movies,refetch,reset, loading, error} = useFetch( () => fetchMovies({query: searchQuery}), false )

  useEffect(() => {
    //we use settimeout so we do not make a new request each time we type a new letter in the searchbar
    const timeoutId = setTimeout(async () => {
      if(searchQuery.trim()){
        await refetch();
      } else {
        reset()
      }
    }, 500);
      
    return () => clearImmediate(timeoutId);
  },[searchQuery]);

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
              <SearchBar 
                placeholder="search for movies..."
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
            </View>
            {
              loading && (
                <ActivityIndicator size="large" color="#0000ff" style={{marginTop: 50, alignSelf: "center"}} />
              )
            }

            {error && (
              <Text style={{color:"red",  marginVertical:18}}>Error: {error.message}</Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text style={{fontSize: 17, color:"white", fontWeight:"bold"}}>
                Search Results for {''}
                <Text style={{color:"magenta"}}>{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View style={{marginTop: 40,}}>
              <Text style={{color:"gray", textAlign:"center"}}>
                {searchQuery.trim() ? 'No movies found' : 'search for a movie'}
              </Text>
            </View>
          ) : null
        }
      />

    </View>
  )
}

export default search