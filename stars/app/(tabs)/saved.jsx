import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { icons } from '../../constants/icons';
import MovieCard from '../../components/moviecard';


const saved = () => {
  const [savedMovies, setSavedMovies] = useState([]);

  const loadSavedMovies = async () => {
    try {
      const movies = await AsyncStorage.getItem('savedMovies');
      if (movies) {
        setSavedMovies(JSON.parse(movies));
      }
    } catch (error) {
      console.error('Error loading saved movies:', error);
    }
  };

  useEffect(() => {
    loadSavedMovies();
  }, [savedMovies]);

  if (savedMovies.length === 0) {
    return (
      <View style={styles.container}>
        <Image style={styles.icon} source={icons.save} />
        <Text style={styles.text}>No movie is saved</Text>
      </View>
    );
  }

  return (
    <View style={{display:"flex", flex: 1, backgroundColor: '#0f0D10',}}>
      <FlatList 
        numColumns={3}
        data={savedMovies}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom:10,
        }}
        style={styles.flatlistStyles}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,  
    backgroundColor: '#0f0D10',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon:{ 
    height: 28,
    width: 30,
    marginBottom: 10,
    tintColor:"#DAA520",
  },
  text:{ 
    color: '#D3D3D3',
    fontWeight: 'bold'
  },
  flatlistStyles:{
    marginTop:70,
    paddingBottom: 100,
  },
});
export default saved