import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/moviecard";



export default function Index() {
  const router = useRouter();

  const { data: movies, loading: moviesLoading, error:moviesError} = useFetch( () => fetchMovies({query: ''}))

  return (
    <View style={{
      flex: 1,
      backgroundColor: "#0f0D10",
    }}
    >
      <Image style={{position: "absolute", width: "100%", zIndex: 0,}} source={images.bg} />
      <ScrollView style={{flex: 1, padding: 5}} showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: "100%", paddingBottom: 10}}>
        <Image style={{width: 40, marginTop: 80, marginBottom: 20, marginHorizontal: "auto"}} source={icons.logo} />

        {moviesLoading ? (
          <ActivityIndicator 
            size= "large"
            color= "#0000ff"
            style={{marginTop: 50, alignSelf: "center"}}
          />
          ) : moviesError ? (
            <Text>Error: {moviesError?.message}</Text>
          ) : (
          <View style={{flex: 1, marginTop: 20,}}>
            <SearchBar
              onPress = {() => router.push("/search")}
              placeholder = "search for a movie"
            />
            <>
              <Text style={{marginTop:20, marginBottom: 12 ,fontWeight: "bold", color:"white"}}>Latest Movies</Text>
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
                style={{marginTop:10, paddingBottom: 100}}
              />
            </>
          </View>
        )}

      </ScrollView>
    </View>
  );
}
