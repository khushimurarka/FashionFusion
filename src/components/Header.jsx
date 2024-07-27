import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const Header = (isCart) => {
  const navigation=useNavigation();
  return (
    < View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.navigate("HOME_STACK")} style={styles.appIconContainer}>
      {
        isCart?(<Ionicons name="chevron-back" size={24} color={"#E96E6E" }/>):(
          <Image
          source={require("../assets/appIcon.png")}
          style={styles.appIcon}
          

          />

        )
      }
      </TouchableOpacity>
      {
        isCart && <Text style={styles.myCart}>My cart</Text>
      }
      
        {/*//<Image source={require("../assets/appIcon.png")} style={styles.appIcon} />*/}
      
      
      <Image source={require("../assets/Ellipse2.png")} style={styles.dp} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //padding: 10,
    //backgroundColor: "#f8f8f8",
  },
  appIconContainer: {
    backgroundColor: "#FFFFFF",
    height: 44,
    width: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginTop:20,
  },
  appIcon: {
    height: 28,
    width: 28,
  },
  dp: {
    height: 44,
    width: 44,
    borderRadius: 22,
    marginTop:27
  },
  myCart:{
    fontSize:28,
    color:"black",
  },
});
