import {View, Text, TextInput, StyleSheet, Alert} from 'react-native';
import React, {useState,useEffect} from 'react';
import VectorIcon from '../utils/VectorIcon';
import {Colors} from '../theme/Colors';
import firestore from '@react-native-firebase/firestore';
import Tts from 'react-native-tts';
import Voice from '@react-native-community/voice';
const ChatFooter = ({userId, chatRef}) => {
  const [message, setMessage] = useState('');
  const [sendEnable, setSendEnable] = useState(false);
   const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
   const speechStartHandler = e => {
    console.log('speech start event', e);
  };
  const speechEndHandler = e => {
    setRecording(false);
    console.log('speech stop event', e);
  };
  const speechResultsHandler = e => {
    console.log('speech event: ',e);
    const text = e.value[0];
    setMessage(text);
    
  };

  const speechErrorHandler = e=>{
    console.log('speech error: ',e);
  }

  
  const startRecording = async () => {
    setRecording(true);
    Tts.stop(); 
    try {
      await Voice.start('en-US'); // en-US
     

    } catch (error) {
      console.log('error', error);
    }
  };
  const stopRecording = async () => {
    
    try {
      await Voice.stop();
      setRecording(false);
      fetchResponse();
    } catch (error) {
      console.log('error', error);
    }
  };
  const clear = () => {
    Tts.stop();
    setSpeaking(false);
    setLoading(false);
    setMessage("");
  };
  
  const stopSpeaking = ()=>{
    Tts.stop();
    setSpeaking(false);
  }

    useEffect(() => {

    // voice handler events
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;
    
    // text to speech events
    Tts.setDefaultLanguage('en-IE');
    Tts.addEventListener('tts-start', event => console.log('start', event));
    Tts.addEventListener('tts-finish', event => {console.log('finish', event); setSpeaking(false)});
    Tts.addEventListener('tts-cancel', event => console.log('cancel', event));

    
    
    return () => {
      // destroy the voice instance after component unmounts
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);



  const onChange = value => {
    setMessage(value);
    setSendEnable(true);
  };

  const onSend = () => {
    chatRef.collection('messages').add({
      body: message,
      sender: userId,
      timestamp: firestore.FieldValue.serverTimestamp(),
    });
    setMessage('');
    setSendEnable(false);
  };

    const speakText = () => {
    Tts.speak(message); // Convert and speak the text
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.row}>
          <VectorIcon
            type="MaterialIcons"
            name="emoji-emotions"
            size={24}
            color={Colors.white}
          />
          <TextInput
            placeholder="Message"
            placeholderTextColor={Colors.textGrey}
            onChangeText={value => onChange(value)}
            style={styles.inputStyle}
            value={message}
          />
        </View>
        <View style={styles.row}>
          <VectorIcon
            type="Entypo"
            name="attachment"
            size={18}
            color={Colors.white}
          />
          {!sendEnable && (
            <>
              <VectorIcon
                type="FontAwesome"
                name="rupee"
                size={20}
                color={Colors.white}
                style={styles.iconStyle}
              />
              <VectorIcon
                type="FontAwesome"
                name="camera"
                size={18}
                color={Colors.white}
              />
            </>
          )}
        </View>
      </View>
      <View style={styles.rightContainer}>
        {sendEnable ? (
          <VectorIcon
            type="MaterialCommunityIcons"
            name="send"
            size={25}
            color={Colors.white}
            onPress={onSend}
          />
        ) : (
          <VectorIcon
            type="MaterialCommunityIcons"
            name="microphone"
            size={25}
            color={recording ? "red": Colors.white}
            onPress={startRecording}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    paddingVertical: 4,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    width: '85%',
    flexDirection: 'row',
    backgroundColor: Colors.primaryColor,
    borderRadius: 30,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconStyle: {
    marginHorizontal: 25,
  },
  rightContainer: {
    backgroundColor: Colors.teal,
    padding: 10,
    borderRadius: 50,
  },
  inputStyle: {
    fontSize: 17,
    color: Colors.white,
    marginLeft: 5,
  },
});

export default ChatFooter;
