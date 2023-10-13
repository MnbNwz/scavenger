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
import Modal from './Modal';
import ImageCard from '../Cards/ImageCard';

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
  title: {
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginVertical: '3%',
    width: '80%', // Increase the width to make the button bigger
    height: 50, // Increase the height to make the button taller
    borderRadius: 10, // Add border radius to give rounded corners
    borderColor: '#000000',
    borderWidth: 3,
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
    // height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#000',
  },
});

const Items = props => {
  const [cardData, setCardData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [fullWatched, setFullWatched] = useState(false);
  // const [FullyWatchedScannedData, setFullyWatchedScannedData] = useState(false);

  const [imageCard, setImageCard] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [points, setPoints] = useState(0);
  const [totalQuizes, setTotalQuizes] = useState(0);
  const [modalForAllQUizes, setSetModalForAllQUizes] = useState(false);
  const [watchQuizAgain, setWatchQuizAgain] = useState(false);
  const [navigateOrNot, setNavigateOrNot] = useState(false);
  const [watchNewQuiz, setWatchNewQuiz] = useState(true);
  const [showQuizMessage, setShowQuizMessage] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      setLoader(true);
      gettingData();
      if (points === 100) {
        setSetModalForAllQUizes(true);
        setShowQuizMessage(true);
      } else {
        setSetModalForAllQUizes(false);
        setShowQuizMessage(false);
      }
    }, []),
  );
  useEffect(() => {
    if (watchQuizAgain) {
      debugger;
      gettingImageCard();
    }
  }, [watchNewQuiz]);

  const url = 'https://nonchalant-foregoing-guarantee.glitch.me/get-player';

  const gettingData = async () => {
    setLoader(true);
    try {
      const response = await axios.post(url, {id: props?.route?.params?.id});
      console.log(response);
      if (response?.data?.success === true) {
        setFullWatched(
          response?.data?.data?.total_cards ===
            response?.data?.data?.cards?.length,
        );
        setNavigateOrNot(
          response?.data?.data?.total_cards ===
            response?.data?.data?.cards?.length,
        );
        console.log(response);
        setCardData(response?.data?.data?.cards);
      }
    } catch (err) {}
    setLoader(false);
  };

  const gettingImageCard = async () => {
    if (points < 100) {
      setLoader(true);
      try {
        const response = await axios.post(
          'https://nonchalant-foregoing-guarantee.glitch.me/get-quiz',
          {
            id: Math.floor(Math.random() * (8 - 1 + 1)) + 1,
          },
        );
        console.log(response);
        setImageCard(response?.data?.data);
        setShowQuiz(true);
      } catch (err) {
        console.log(err);
      }
      setLoader(false);
    } else {
    }
  };
  return showQuiz ? (
    <ImageCard
      setTotalQuizes={() => setTotalQuizes(totalQuizes + 1)}
      setPoints={() => setPoints(points + 10)}
      back={() => setShowQuiz(false)}
      images={imageCard?.images}
      imageCard={imageCard}
      setWatchQuizAgain={() => {
        setWatchQuizAgain(true);
        setWatchNewQuiz(!watchNewQuiz);
      }}
      loader={loader}
    />
  ) : (
    <View
      style={[
        styles.container,
        {paddingTop: cardData.length === 0 ? '40%' : 0},
      ]}>
      {navigateOrNot && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            top: '1%',
            zIndex: 10,
            elevation: 10,
            backgroundColor: '#98FB98',
          }}>
          <Text style={{fontSize: 18, textAlign: 'center'}}>
            {`You have watched all the scan cards ${'\n'} You cant scan card anymore. Please come later`}
          </Text>
        </View>
      )}
      {showQuizMessage && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            top: '24.5%',
            zIndex: 15,
            elevation: 15,
            backgroundColor: '#98FB98',
          }}>
          <Text style={{fontSize: 18, textAlign: 'center'}}>
            {`You have answered ${totalQuizes} questions and you earned ${points}. Since you have earned ${points}. ${'\n'}So, You can't solve quiz anymore.`}
          </Text>
        </View>
      )}
      <ProgressLoader
        visible={loader}
        isModal={true}
        isHUD={true}
        hudColor={'#000000'}
        color={'#FFFFFF'}
      />

      {modalForAllQUizes && (
        <Modal
          data={'You have answered the all quizzes. Please come back later.!'}
          onSubmit={() => {
            setSetModalForAllQUizes(false);
          }}
        />
      )}
      <View
        style={[
          styles.cameraContainer,
          {
            borderBottomWidth: cardData.length === 0 ? 0 : 1,
            marginTop: navigateOrNot ? '16%' : '5%',
            paddingBottom: showQuizMessage ? '22%' : '5%',
          },
        ]}>
        <TouchableOpacity
          onPress={async () => {
            if (navigateOrNot) {
              return;
            } else {
              props?.navigation?.navigate('PDF Data', {
                id: props?.route?.params?.id,
                cardData,
              });
            }
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
      {cardData.length > 3 && (
        <View
          style={{
            flexDirection: 'row',
            marginVertical: '2%',
          }}>
          <View style={{width: '40%', marginLeft: points === 0 ? 0 : '-1%'}}>
            <TouchableOpacity onPress={() => gettingImageCard()}>
              {<Text style={styles.title}>Quiz </Text>}
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '30%',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 22, paddingLeft: '10%'}}>
              Quiz No. {totalQuizes}
            </Text>
          </View>
          <View
            style={{
              width: '30%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 22}}>Points: {points}</Text>
          </View>
        </View>
      )}
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: cardData.length > 3 ? '-3%' : 0,
        }}
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
                console.log(item);
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
  );
};

export default Items;
