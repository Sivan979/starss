import { StyleSheet, Text,Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import {MovieShape} from '../shapes/shapes.jsx';
import PropTypes from 'prop-types';
import { icons } from "@/constants/icons.js";


const movieCard = ({ movie }) => {
  const {id,title, poster_path, vote_average, release_date } = movie;
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity style={{width: "30%"}}>
        <Image
          source={{uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 
          'https://placehold.co/600x400/1a1a1a/ffffff.png'
          }}
          style={{width: "100%", height:160, borderRadius:10}}
          resizeMode='cover'
        />
        <Text style={{color:"white", fontWeight:"bold", marginTop:10}} numberOfLines={1}>{title}</Text>
        <View style={{display:"flex" ,flexDirection:"row", alignItems:"center", justifyContent:"flex-start", columnGap:4 , }}>
          <Image source={icons.star} style={{height:17, marginVertical:3}} />
          <Text style={{color:"white",fontWeight:"bold", fontSize:14 }}>{Math.round(vote_average / 2)}</Text>
        </View>
        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
          <Text style={{color:"gray"}}>{release_date?.split('-')[0]}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  )
}


movieCard.propTypes = {
  movie: PropTypes.shape(MovieShape).isRequired,
};
export default movieCard

const styles = StyleSheet.create({})