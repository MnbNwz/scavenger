import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';
import axios from 'axios';

const PDF_Data = ({navigation}) => {
  const [scannedData, setScannedData] = useState('');
  const [showCam, setShowCam] = useState(true);

  const url =
    'https://nonchalant-foregoing-guarantee.glitch.me/add-player-card';

  const handleBarcodeScan = async ({data}) => {
    setScannedData(data);
    setShowCam(false);
    const scannedId = '12,d0ae5b2d-fafc-446f-a0cb-b3f9b094c94d';
    var newID = scannedId.split(',');
    var scavenger_id =
      // newID[0]
      12;
    let id =
      // props?.params?id
      12;
    var card_id = newID[1];

    let payload = {id, scavenger_id, card_id};

    try {
      debugger;
      const response = await axios.post(url, payload);
      console.log(response);
    } catch (err) {
      console.log(err);
      debugger;
    }
  };
  console.log(scannedData);
  return (
    <View>
      {showCam ? (
        <View>
          <RNCamera
            style={{height: '90%', width: '90%'}}
            type={RNCamera.Constants.Type.back}
            captureAudio={false}
            onBarCodeRead={handleBarcodeScan}
          />
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => navigation.goBack()}>
            <Text
              style={{
                paddingVertical: '5%',
                fontSize: 22,
              }}>
              CLOSE
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text>DATA from QR{scannedData}</Text>
        </View>
      )}
    </View>
  );
};

export default PDF_Data;
