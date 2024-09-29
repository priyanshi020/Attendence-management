import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../styles/mixins'

export default function Navbar() {
  return (
    <View>
     
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require("../../Images/tufcon-logo.png")}
        />
    
    </View>
  )
}

const styles = StyleSheet.create({
    logo: {
        width: width(1.9),
        height: height(0.17),
        marginTop: Platform.OS === "android" ? 20 : marginLeftAndRight(0.1),
        alignSelf: 'center',
      },
})