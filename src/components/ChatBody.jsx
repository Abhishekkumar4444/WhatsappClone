import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {Colors} from '../theme/Colors';
import VectorIcon from '../utils/VectorIcon';
import firestore from '@react-native-firebase/firestore';
import { NormalizeSize } from './../utils/sizeNormalisation'
import { useIsFocused } from '@react-navigation/native'

const ChatBody = ({chatId, userId}) => {
  const scrollViewRef = useRef();

  const [messages, setMessages] = useState([]);
   const focus = useIsFocused()

  useEffect(() => {
    firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('timestamp')
      .onSnapshot(snapShot => {
        const allMessages = snapShot.docs.map(snap => {
          return snap.data();
        });
        // console.log(allMessages)
        setMessages(allMessages);
      });
  }, [focus]);

function formatTimestamp(timeString) {
  if (!timeString) return ''; // Handle cases where timeString is not provided

  // Parse the time string into a Date object
  const date = new Date(timeString);
  
  if (isNaN(date.getTime())) {
    // Handle cases where the date is not valid
    return 'Invalid Date';
  }

  // Calculate the time difference in milliseconds
  const timeDifference = Date.now() - date.getTime();
  
  // Calculate the number of days between the message date and today
  const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));

  if (daysDifference === 0) {
    return 'Today';
  } else if (daysDifference === 1) {
    return 'Yesterday';
  } else {
   
    return timeString
  }
}




  function formatTimeIn12HrFormat(timestamp) {
  if (!timestamp) return ''; // Handle cases where timestamp is not provided

  const date = timestamp?.toDate();
  const hours = date?.getHours();
  const minutes = date?.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12;

  // Pad single-digit minutes with a leading zero
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}


  const UserMessageView = ({message, time}) => {
    return (
      <View style={styles.userContainer}>
      
        <View style={styles.userInnerContainer}>
        
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.time}>{time}</Text>
          <VectorIcon
            name="check-double"
            type="FontAwesome5"
            color={Colors.blue}
            size={12}
            style={styles.doubleCheck}
          />
        </View>
      </View>
    );
  };

  const OtherUserMessageView = ({message, time}) => {
    return (
      <View style={styles.otherUserContainer}>
      <View style={styles.time}>
      </View>
        <View style={styles.otherUserInnerContainer}>
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
    );
  };

  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({animated: true});
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={scrollToBottom}
        showsVerticalScrollIndicator={false} contentContainerStyle={{flex:1}}>
        
          <View style={[styles.time,{right:20,top:10, marginLeft:0,  borderRadius: 20,alignItems:"center",justifyContent: "center"}]}>
           <Text>{formatTimestamp(messages[0]?.timestamp?.toDate().toDateString())}</Text>
           </View>
        {messages?.map((item,index) => (
          <View key={index.toString()}>
          
            {item.sender === userId ? (
              <UserMessageView
                message={item.body}
                 time={formatTimeIn12HrFormat(item.timestamp)}
              />
            ) : (
              <OtherUserMessageView
                message={item.body}
                  time={formatTimeIn12HrFormat(item.timestamp)}
              />
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.scrollIcon}>
        <View style={styles.scrollDownArrow}>
          <VectorIcon
            name="angle-dobule-down"
            type="Fontisto"
            size={12}
            color={Colors.white}
            onPress={scrollToBottom}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: NormalizeSize(5),
    top: NormalizeSize(20),
  },
  otherUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: NormalizeSize(5),
  },
  userInnerContainer: {
    backgroundColor: Colors.teal,
    paddingVertical: NormalizeSize(8),
    paddingHorizontal: NormalizeSize(15),
    borderTopLeftRadius: NormalizeSize(20),
    borderBottomRightRadius: NormalizeSize(30),
    borderBottomLeftRadius: NormalizeSize(30),
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  message: {
    fontSize: NormalizeSize(13),
    color: Colors.white,
  },
  time: {
    fontSize: NormalizeSize(9),
    color: Colors.white,
    marginLeft: NormalizeSize(5),
  },
  doubleCheck: {
    marginLeft: NormalizeSize(5),
  },
  otherUserInnerContainer: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: NormalizeSize(8),
    paddingHorizontal: NormalizeSize(15),
    borderTopRightRadius: NormalizeSize(30),
    borderBottomRightRadius: NormalizeSize(30),
    borderBottomLeftRadius: NormalizeSize(30),
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  scrollDownArrow: {
    backgroundColor: Colors.primaryColor,
    borderRadius: NormalizeSize(50),
    height: NormalizeSize(30),
    width: NormalizeSize(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default ChatBody;
