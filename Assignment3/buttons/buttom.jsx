import React from 'react'
import { View,StyleSheet } from 'react-native';
import PrimaryBtn from './Buttons/PrimaryBtn'
import SecondaryBtn from './Buttons/SecondaryBtn'
import SuccessBtn from './Buttons/SuccesBtn'
import DangerBtn from './Buttons/DangerBtn'
import WarningBtn from './Buttons/WarningBtn'
import InfoBtn from './Buttons/InfoBtn';
const Buttons = () => {
  return (
    <View style={styles.container}>
        <PrimaryBtn style={styles.myBtn}/>
        <SecondaryBtn style={styles.myBtn}/>
        <SuccessBtn style={styles.myBtn}/>
        <DangerBtn style={styles.myBtn}/>
        <WarningBtn style={styles.myBtn}/>
        <InfoBtn style={styles.myBtn}/>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin:10,
      },
      myBtn: {
        marginBottom: 40,
        padding: 20,
      },
});
export default Buttons;