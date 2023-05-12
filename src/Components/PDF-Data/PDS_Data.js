import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';

const PDF_Data = ({navigation}) => {
  const [scannedData, setScannedData] = useState('');
  const [showCam, setShowCam] = useState(true);

  const handleBarcodeScan = ({data}) => {
    setScannedData(data);
    setShowCam(false);
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
          DATA from QR <Text>{scannedData}</Text>
        </View>
      )}
    </View>
  );
};

export default PDF_Data;
