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
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
});

const Items = ({navigation}) => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    gettingData();
  }, []);

  const url = 'https://nonchalant-foregoing-guarantee.glitch.me/get-player';

  const gettingData = async () => {
    try {
      const response = await axios.post(url, {id: 1});
      console.log(response);
      response?.data?.success === true &&
        setCardData(response?.data?.data?.cards);
    } catch (err) {
      console.log(err);
      debugger;
    }
  };
  console.log(cardData);
  const B = props => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>;

  const data = [
    {
      id: '1',
      title: 'Card 1',
      points: '10',
      imageSource:
        'http://res.cloudinary.com/dfz28acim/image/upload/v1683547307/recipe_image_1_kspw8z.jpg',
      options: ['Option 1', 'Option 2', 'Option 3'],
    },
    {
      id: '2',
      title: 'Card 2',
      points: '5',
      imageSource:
        'http://res.cloudinary.com/dfz28acim/image/upload/v1683547307/recipe_image_1_kspw8z.jpg',
      options: ['Option A', 'Option B', 'Option C'],
    },
    // Add more data as needed
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.cameraContainer]}>
        <TouchableOpacity
          onPress={async () => {
            navigation.navigate('PDF Data');
          }}
          style={{}}>
          <Image
            style={{
              height: 120,
              width: 120,
            }}
            source={require('/Users/muneeb/Desktop/Data/scavenger_Hunt/Assets/qrCode.png')}
          />
          {/* <Text
            style={{
              alignSelf: 'center',
              paddingVertical: '2%',
              fontSize: 17,
            }}>
            Click to scan PDF
          </Text> */}
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{alignItems: 'center', alignSelf: 'center'}}
        style={[styles.scrollContainer]}>
        {cardData.length === 0 ? (
          <Text style={{paddingTop: '10%', fontSize: 20, fontWeight: 'bold'}}>
            There is no card
          </Text>
        ) : (
          <View>
            <FlatList
              data={data}
              renderItem={({item}) => {
                return (
                  <CardComponent
                    title={item.title}
                    points={item.points}
                    imageSource={item.imageSource}
                    options={item.options}
                    onSubmit={() => {
                      // Handle submit action
                    }}
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
