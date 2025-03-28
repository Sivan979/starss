import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'
import PropTypes from 'prop-types'



const SearchBar = ({placeholder, onPress, onChangeText, value}) => {
  return (
    <View style=
      {{flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#4f0D29",
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 15,
      }}>
      <Image style={{width: 20, resizeMode: "contain", tintColor: "#ab8bff"}} source={icons.search} />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor= "#a8b5db"
        style={{ flex: 1, marginLeft: 6, color: "white"}}
      />
    </View>
  )
}

SearchBar.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onpress: PropTypes.func,
    value: PropTypes.string,
    onChangeText:PropTypes.func,
};



export default SearchBar


const styles = StyleSheet.create({})