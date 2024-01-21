import React ,{useState}from 'react';
import {View, StyleSheet, Text,Image} from 'react-native';
import CallLink from '../components/CallLink';
import RecentCalls from '../components/RecentCalls';
import {Colors} from '../theme/Colors';
import { NormalizeSize } from '../utils/sizeNormalisation'

const SplashScreen = () => {
 

  return (
    <View style={styles.container}>
        <Image
          style={styles.image1}
          source={require('../assets/WhatsAppIconDark.png')} 
          resizeMode="contain"
          alt="logo"
        />
        <View>

        <Text style={[styles.textStyle,{left:20,fontSize:16}]}> from </Text>
        <View style={{flexDirection:"row",alignItems:"center"}}>
         <Image
          style={[styles.image2]}
          source={require('../assets/metaLogo.png')} 
          resizeMode="contain"
          alt="logo"
          />
        <Text style={styles.textStyle}>Meta</Text>
        </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background, 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image1: {
    height: NormalizeSize(300),
    width: NormalizeSize(300)
  },
  image2: {
    height: NormalizeSize(50),
    width: NormalizeSize(50),
    top:NormalizeSize(180)
  },
  textStyle: {fontSize:NormalizeSize(18),top:NormalizeSize(180)}
});

export default SplashScreen;
