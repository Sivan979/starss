import { ActivityIndicator, FlatList, Image, ScrollView, Text, View, StyleSheet } from "react-native";
import {images} from '../../constants/images';
import { icons } from "../../constants/icons";
import SearchBar from "../../components/SearchBar";
import {useRouter} from "expo-router";
import useFetch from "../../services/useFetch";
import { fetchMovies } from "../../services/api";
import MovieCard from "../../components/moviecard";



export default function Index() {

  const router = useRouter();
  const { data: movies, loading, error} = useFetch( () => fetchMovies({query: ''}))

  return (
    <View style={styles.container}>

      <Image style={styles.backgroundImg} source={images.bg} />
      <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: "100%", paddingBottom: 10}}>
        <Image style={styles.logo} source={icons.logo} />

        {loading ? (
          <ActivityIndicator 
            size= "large"
            color= "#0000ff"
            style={styles.loadingIcon}
          />
          ) : error ? (
            <Text>Error: {error?.message}</Text>
          ) : (
          <View style={styles.contentContainer}>
            <SearchBar
              onPress = {() => router.push("/search")}
              placeholder = "search for a movie"
            />
            <>
              <Text style={styles.latestMoviesText}>Latest Movies</Text>
              <FlatList
                data={movies}
                renderItem={({item}) => (
                  <MovieCard movie={item} />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom:10,
                }}
                scrollEnabled={false}
                style={styles.flatlistStyles}
              />
            </>
          </View>
        )}

      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#0f0D10",
  },
  backgroundImg:{
    position: "absolute",
    width: "100%",
    zIndex: 0,
  },
  scrollview:{
    flex: 1,
    padding: 5,
  },
  logo:{
    width: 50,
    height:50,
    marginTop: 80,
    marginBottom: 20,
    marginHorizontal: "auto",
    borderRadius:40,
  },
  loadingIcon:{
    marginTop: 50,
    alignSelf: "center",
  },
  contentContainer:{
    flex: 1,
    marginTop: 20,
  },
  latestMoviesText:{
    marginTop:20,
    marginBottom: 12,fontWeight: "bold",
    color:"white",
  },
  flatlistStyles:{
    marginTop:10,
    paddingBottom: 100,
  },

});