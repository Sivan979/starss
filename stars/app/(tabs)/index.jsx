import { Image, ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {useRouter} from "expo-router";


export default function Index() {
  const router = useRouter();
  return (
    <View style={{
      flex: 1,
      backgroundColor: "#0f0D10",
    }}
    >
      <Image style={{position: "absolute", width: "100%", zIndex: 0,}} source={images.bg} />
      <ScrollView style={{flex: 1, padding: 5}} showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: "100%", paddingBottom: 10}}>
        <Image style={{width: 40, marginTop: 80, marginBottom: 20, marginHorizontal: "auto"}} source={icons.logo} />

        <View style={{flex: 1, marginTop: 20,}}>
          <SearchBar
            onPress = {() => router.push("/search")}
            placeholder = "search for a movie"
          />
        </View>

      </ScrollView>
    </View>
  );
}
