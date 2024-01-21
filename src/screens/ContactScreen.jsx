import React,{useEffect,useState} from 'react';
import {ScrollView, StyleSheet,} from 'react-native';
import ContactHeader from '../components/ContactHeader';
import ContactList from '../components/ContactList';
import {Colors} from '../theme/Colors';
import firestore from '@react-native-firebase/firestore';
import { getImage } from '../utils/helper'
import { useIsFocused } from '@react-navigation/native'
const ContactScreen = props => {
  const [users, setUsers] = useState([]);
  const {userId} = props.route.params;
 const focus = useIsFocused()
  useEffect(() => {
    getImage();
     getUserData()
    .then(userData => {
      setUsers(userData);
    })
    .catch(userError => {
      console.error('User data fetch error:', userError)
    })
  }, [focus]);
const getUserData = async () => {
  const userRef = await firestore().collection('users').get();
  const userData = await Promise.all(
    userRef.docs.map(async item => {
      const id = item.id; 
      const name = id === userId ? item.data().name.concat(" (You)") : item.data().name;
      const profile = await getImage(item.data().profile);
      return {
        id,
        name,
        profile,
      };
    })
  );
  return userData;
};


  return (
    <ScrollView style={styles.scrollViewStyle}>
      <ContactHeader users={users} />
      <ContactList userId={userId}  users={users}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    backgroundColor: Colors.background,
  },
});

export default ContactScreen;
