import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';

import axios from 'axios';
import CardComponent from '../Cards/Card';
import {useFocusEffect} from '@react-navigation/native';
import ProgressLoader from 'rn-progress-loader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    borderColor: 'gray',
    borderRightWidth: 1,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: Dimensions.get('window').width > 320 ? 16 : 14,
    fontWeight: 'bold',
    color: 'black',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cameraContainer: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#000',
  },
});

const Items = props => {
  const [cardData, setCardData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [cardsFullData, setCardsFullData] = useState([]);
  const [showItems, setShowItems] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setLoader(true);
      gettingData();
    }, []),
  );

  const url = 'https://nonchalant-foregoing-guarantee.glitch.me/get-player';

  const gettingData = async () => {
    try {
      const response = await axios.post(url, {id: props?.route?.params?.id});
      console.log(response);
      if (response?.data?.success === true) {
        console.log(response);
        setCardData(response?.data?.data?.cards);
        setCardsFullData(response?.data?.data);
      }
    } catch (err) {
      console.log(err);
      debugger;
    }
    setLoader(false);
  };

  // console.log(cardsFullData);

  return showItems ? (
    <View
      style={[
        styles.container,
        {paddingTop: cardData.length === 0 ? '40%' : 0},
      ]}>
      <ProgressLoader
        visible={loader}
        isModal={true}
        isHUD={true}
        hudColor={'#000000'}
        color={'#FFFFFF'}
      />
      <View
        style={[
          styles.cameraContainer,
          {borderBottomWidth: cardData.length === 0 ? 0 : 1},
        ]}>
        <TouchableOpacity
          onPress={async () => {
            props?.navigation?.navigate('PDF Data', {
              id: props?.route?.params?.id,
              cardData,
            });
          }}
          style={{}}>
          <Image
            style={{
              height: cardData.length === 0 ? 150 : 120,
              width: cardData.length === 0 ? 150 : 120,
            }}
            source={require('/Users/muneeb/Desktop/Data/scavenger_Hunt/Assets/qrCode.png')}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{alignItems: 'center', alignSelf: 'center'}}
        style={[styles.scrollContainer]}>
        {cardData.length === 0 ? (
          <Text
            style={{
              marginTop: cardData.length === 0 ? '20%' : '5%',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            <Text style={{}}>There is no card right now</Text> {'.\n'}
            <Text> Please Scan the QR to unlock the Cards</Text>
          </Text>
        ) : (
          <View>
            <FlatList
              data={cardData}
              renderItem={({item}) => {
                return (
                  <CardComponent
                    selected_option={item?.selected_option}
                    item={item}
                    id={item?.id}
                    correct={item?.correct}
                    title={item.card_title}
                    points={item?.points}
                    imageSource={item?.image}
                    options={item?.options}
                    onSubmit={() => {}}
                  />
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
        )}
      </ScrollView>
    </View>
  ) : (
    <></>
  );
};

export default Items;
