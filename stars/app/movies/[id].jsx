import { View, Text, ScrollView,Image, TouchableOpacity , StyleSheet} from 'react-native'
import React, { useState, useEffect } from 'react';
import {router, useLocalSearchParams} from 'expo-router';
import useFetch from '../../services/useFetch';
import {fetchMovieDetails} from '../../services/api';
import { icons } from '../../constants/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MovieInfo = ({section, info}) => {
  return(
    <View>
      <Text style={{color: "white", fontWeight:"bold",fontSize:17}}>{section}</Text>
      <Text style={{color: "#D3D3D3",fontSize:15}}>{info || 'N/A'}</Text>
    </View>
  )
}


const movieDtails = () => {

  const {id} = useLocalSearchParams();
  const {data: movie, loading} = useFetch(() => fetchMovieDetails(String(id)))
  const [isSaved, setIsSaved] = useState(false);

  // Check if the movie is already saved when movie data is loaded
  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const savedMovies = await AsyncStorage.getItem('savedMovies');
        const movies = savedMovies ? JSON.parse(savedMovies) : [];
        const found = movies.some(m => m.id === movie.id);
        setIsSaved(found);
      } catch (error) {
        console.error('Error checking saved movies:', error);
      }
    };
    if (movie) {
      checkIfSaved();
    }
  }, [movie]);

  // Toggle saving the movie
  const toggleSave = async () => {
    try {
      const key = 'savedMovies';
      let savedMovies = await AsyncStorage.getItem(key);
      let movies = savedMovies ? JSON.parse(savedMovies) : [];
      if (isSaved) {
        // Remove the movie if it is already saved
        movies = movies.filter(m => m.id !== movie.id);
        setIsSaved(false);
      } else {
        // Add the movie if not saved already
        movies.push(movie);
        setIsSaved(true);
      }
      await AsyncStorage.setItem(key, JSON.stringify(movies));
    } catch (error) {
      console.error('Error updating saved movies:', error);
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom:80}}>
        <View>
          <Image style={styles.mainImg} source={{uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`}}/>
        </View>

        <View style={styles.infoContainer}>

          <View style={styles.infoUpper}>
            <Text style={styles.movieTitle}>{movie?.title}</Text>
            <View style={styles.dateContainer}>
              <Text style={{color: "#D3D3D3"}}>{movie?.release_date?.split('-')[0]}</Text>
              <Text style={{color: "#D3D3D3", marginLeft:10}}>{movie?.runtime}m</Text>
            </View>
            <View style={styles.voteContainer}>
              <Image source={icons.star} />
              <Text style={{color: "#D3D3D3"}}>{Math.round(movie?.vote_average ?? 0)}/10</Text>
              <Text style={{color: "#D3D3D3", marginLeft:10}}>({movie?.vote_count}) votes</Text>
            </View>
          </View>
          
          <MovieInfo section="overview" info={movie?.overview}/> 
          <MovieInfo section="Genres" info={movie?.genres?.map((g) => g.name).join(' - ') || 'N/A'}/>
          <View style={styles.budgetContainer}>
            <MovieInfo section="Budget" info={`$${movie?.budget / 1000000} million`}/> 
            <MovieInfo section="Revenue" info={`$${Math.round(movie?.revenue / 1000000)} million`}/> 
          </View>
          <MovieInfo section="production_companies" info={movie?.production_companies?.map((g) => g.name).join(' - ') || 'N/A'}/> 

          <TouchableOpacity style={styles.saveBtn} onPress={toggleSave}>
            <Text style={styles.saveBtnText}>
              {isSaved ? 'Saved' : 'Save'}
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      <TouchableOpacity style={styles.backBtn} onPress={router.back}>
        <Image style={{transform: [{ rotate: '180deg' }], }} source={icons.arrow} />
        <Text style={styles.backBtnText}>Back</Text>
      </TouchableOpacity>


    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#0f0D10",
  },
  mainImg:{
    width: "100%",
    height: 600,
    resizeMode:"stretch",
  },
  infoContainer:{
    flexDirection:"column",
    alignItems:"flex-start",
    justifyContent:"center",
    marginTop:20, 
    paddingHorizontal:20,
    rowGap:25,

  },
  infoUpper:{
    rowGap: 5,
  },
  movieTitle:{
    fontWeight:"bold",
    color: "white",
    fontSize:20,
    marginBottom:15,
  },
  dateContainer:{
    flexDirection:"row",
    alignItems:"center",
  },
  voteContainer:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"blue",
    paddingHorizontal:3,
    width:"100%",
    paddingVertical:2,
    borderRadius:8,
  },
  budgetContainer:{
    flexDirection:"row",
    columnGap:70
  },
  saveBtn: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 20,
  },
  saveBtnText:{ 
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  backBtn:{
    backgroundColor:"white",
    width:"100%",
    height:50,
    borderRadius: 50,
    marginBottom:40,
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
    gap:2,
  },
  backBtnText:{
    color:"red",
    fontWeight:"bold",
    fontSize: 18,
    letterSpacing:0.5,
  }
});

export default movieDtails