import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';

function App() {
  function onConferenceTerminated(nativeEvent) {
    /* Conference terminated event */
    // console.log(nativeEvent);
  }

  function onConferenceJoined(nativeEvent) {
    /* Conference joined event */
    // console.log(nativeEvent);
  }

  function onConferenceWillJoin(nativeEvent) {
    /* Conference will join event */
    // console.log(nativeEvent);
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
