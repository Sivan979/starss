import { View, Text, ScrollView,Image } from 'react-native'
import React from 'react'
import {useLocalSearchParams} from 'expo-router';
import useFetch from '../../services/useFetch';
import {fetchMovieDetails} from '../../services/api';
import { icons } from '../../constants/icons';

const movieDtails = () => {
  const {id} = useLocalSearchParams();

  const {data: movie, loading} = useFetch(() => fetchMovieDetails(String(id)))

  return (
    <View style={{ flex: 1, backgroundColor: "#0f0D10",}}>
      <ScrollView contentContainerStyle={{ paddingBottom:80}}>
        <View>
          <Image resizeMode="stretch" style={{width: "100%", height: 600}} source={{uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`}}/>
        </View>

        <View style={{flexDirection:"column", alignItems:"flex-start", justifyContent:"center", marginTop:20, paddingHorizontal:20}}>
          <Text style={{fontWeight:"bold" , color: "white", fontSize:19}}>{movie?.title}</Text>
        </View>

        <View style={{flexDirection:"row", alignItems:"center", marginHorizontal:20, marginTop:8}}>
          <Text style={{color: "#D3D3D3"}}>{movie?.release_date?.split('-')[0]}</Text>
          <Text style={{color: "#D3D3D3", marginLeft:10}}>{movie?.runtime}m</Text>
        </View>

        <View style={{flexDirection:"row", alignItems:"center", backgroundColor:"blue", paddingHorizontal:4, paddingVertical:2, borderRadius:30, marginTop:5, width:"35%"}}>
          <Image source={icons.star} />
          <Text style={{color: "#D3D3D3"}}>{Math.round(movie?.vote_average ?? 0)}/10</Text>
          <Text style={{color: "#D3D3D3", marginLeft:10}}>({movie?.vote_count}) votes</Text>
        </View>

      </ScrollView>
    </View>
  )
}

export default movieDtails