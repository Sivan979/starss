import { StyleSheet, Text,Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import {MovieShape} from '../shapes/shapes.jsx';
import PropTypes from 'prop-types';
import { icons } from "../constants/icons.js";



const movieCard = ({ movie }) => {
  const {id,title, poster_path, vote_average, release_date } = movie;

  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity style={{width: "30%"}}>
        <Image
          source={{uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 
            'https://placehold.co/600x400/1a1a1a/ffffff.png'
          }}
          style={styles.movieImg}
          resizeMode='cover'
        />
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <View style={styles.voteContainer}>
          <Image source={icons.star} style={styles.star} />
          <Text style={styles.votes}>{Math.round(vote_average / 2)}</Text>
        </View>
        <View style={styles.releaseContainer}>
          <Text style={styles.release}>{release_date?.split('-')[0]}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  )
}


movieCard.propTypes = {
  movie: PropTypes.shape(MovieShape).isRequired,
};

export default movieCard


const styles = StyleSheet.create({
  movieImg:{
    width: "100%",
    height:160,
    borderRadius:10,
  },
  title:{
    color:"white",
    fontWeight:"bold",
    marginTop:10,
  },
  voteContainer:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-start",
    columnGap: 4,
  },
  star:{
    height:17,
    marginVertical:3,
  },
  votes:{
    color:"white",
    fontWeight:"bold",
    fontSize:14,
  },
  releaseContainer:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
  },
  release:{
    color:"gray",
  },
})