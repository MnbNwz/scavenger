import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StatusBar,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import ProgressLoader from 'rn-progress-loader';
import axios from 'axios';
import SingleCardComponent from '../Cards/FullCard';
import Modal from '../Items/Modal';

const PDF_Data = props => {
  const [scannedData, setScannedData] = useState('');
  const [showCam, setShowCam] = useState(true);
  const [fullCardData, setFullCardData] = useState({});
  const [loader, setLoader] = useState(false);
  const [alreadyWatchedScannedCard, setAlreadyWatchedScannedCard] =
    useState(false);

  const url =
    'https://nonchalant-foregoing-guarantee.glitch.me/add-player-card';

  const handleBarcodeScan = async data => {
    setLoader(true);
    setScannedData(data?.data);

    var newID = data?.data.split(',');
    var scavenger_id = newID[0];

    let id = props?.route?.params?.id;
    var card_id = newID[1];
    let payload = {id, scavenger_id, card_id};
    console.log(payload);
    console.log(props?.cardData);
    let flag = true;
    props?.route?.params?.cardData?.forEach(card => {
      if (card.id === card_id) {
        flag = false;
      }
    });
    if (flag) {
      try {
        const response = await axios.post(url, payload);
        if (response.data.success === true) {
          setFullCardData(response?.data?.data);
        }
      } catch (err) {
        console.log(err);
      }
      setShowCam(false);
      setLoader(false);
    } else {
      setAlreadyWatchedScannedCard(true);
      debugger;
      setShowCam(false);
      setLoader(false);
      // showMessage({
      //   message: 'Card already found in your list',
      //   type: 'info',
      // });

      setLoader(false);
    }
    setLoader(false);
  };
  console.log(scannedData);
  return (
    <View>
      <ProgressLoader
        visible={loader}
        isModal={true}
        isHUD={true}
        hudColor={'#000000'}
        color={'#FFFFFF'}
      />
      {alreadyWatchedScannedCard && (
        <Modal
          data={`You have already scanned this card.${'\n'}Please Scan another card.`}
          onSubmit={() => {
            setAlreadyWatchedScannedCard(false);
            props?.navigation.goBack();
          }}
        />
      )}
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
            onPress={() => props?.navigation.goBack()}>
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
        !alreadyWatchedScannedCard && (
          <View
            style={{
              height:
                Dimensions.get('window').height - 2 * StatusBar.currentHeight,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <SingleCardComponent
              watchQUiz={props?.route?.params?.watchQUiz}
              back={() => props?.navigation.goBack()}
              userID={props?.route?.params?.id}
              id={fullCardData?.id}
              card_title={fullCardData?.card_title}
              correct={fullCardData?.correct}
              image={fullCardData?.image}
              points={fullCardData?.points}
              options={fullCardData?.options}
              card={fullCardData}
            />
          </View>
        )
      )}
    </View>
  );
};

export default PDF_Data;
