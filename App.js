import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';
import Icon from 'react-native-vector-icons/FontAwesome';

function App() {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    );

    console.log(granted);

    if (!granted) {
      try {
        const audioPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Example App',
            message: 'Example App access to your AUDIO ',
          },
        );
        if (audioPermission === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the audio');
          alert('You can use the audio');
        } else {
          console.log('location permission denied');
          alert('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  function onConferenceTerminated(nativeEvent) {
    /* Conference terminated event */
    console.log('onterminated', nativeEvent);
  }

  function onConferenceJoined(nativeEvent) {
    /* Conference joined event */
    console.log('onjoined', nativeEvent);
  }

  function onConferenceWillJoin(nativeEvent) {
    /* Conference will join event */
    console.log('onwilljoin', nativeEvent);
  }

  const [room, setRoom] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const url = 'http://audio.cquran.my.id/' + room;
  const userInfo = {
    displayName: 'User',
    email: 'user@example.com',
    avatar: 'https:/gravatar.com/avatar/abc123',
  };

  let content = (
    <>
      <Text>Enter Room Number:</Text>
      <View style={{backgroundColor: 'grey', width: '40%', marginTop: 10}}>
        <TextInput
          keyboardType="number-pad"
          value={room}
          onChangeText={(text) => setRoom(text)}
          style={{color: 'white'}}
        />
        <Icon name="home" />
      </View>
    </>
  );

  if (isConnected) {
    content = <Text>You are on room {room}</Text>;
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 26}}>
          cQuran audio test
        </Text>
      </View>
      <View style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
        {content}
      </View>
      <View style={{flex: 0.2}}>
        <Button
          title="Join"
          color="green"
          onPress={() => {
            JitsiMeet.audioCall(url, userInfo);
            setIsConnected(true);
            alert('connected');
          }}
          disabled={room == '' || isConnected}
        />
        <View style={{marginVertical: 5}} />
        <Button
          title="hang"
          color="red"
          onPress={() => {
            JitsiMeet.endCall();
            setRoom('');
            setIsConnected(false);
            alert('disconnected');
          }}
          disabled={!isConnected}
        />
      </View>
      <JitsiMeetView
        onConferenceTerminated={(e) => onConferenceTerminated(e)}
        onConferenceJoined={(e) => onConferenceJoined(e)}
        onConferenceWillJoin={(e) => onConferenceWillJoin(e)}
        style={{flex: 0}}
      />
    </View>
  );
}

export default App;
