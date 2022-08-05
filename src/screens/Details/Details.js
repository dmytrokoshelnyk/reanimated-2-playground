import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Image, Animated} from 'react-native';

import {SharedElement} from 'react-navigation-shared-element';

import data, {DetailsCategory} from '../../../data';
import {getSharedElIdForImageCard} from '../../util/util';
import {GoBackBtn} from '../../components/GoBackBtn/GoBackBtn';
import {Card, SHARED_ELEMENTS_TYPES} from '../../components/Card/Card';
import {Transition, Transitioning} from 'react-native-reanimated';

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={500} />
    <Transition.Change type="fade" durationMs={500} />
    <Transition.Out type="fade" durationMs={5000} />
  </Transition.Together>
);

function DetailsScreen({route, navigation}) {
  const {cardIndex, imageIndex} = route.params;
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const card = data[cardIndex];
  const subCategory = card.subCategories[imageIndex];
  const imageUrl = subCategory.url;
  const sharedElementImageId = getSharedElIdForImageCard(
    card,
    subCategory,
    SHARED_ELEMENTS_TYPES.image,
  );
  const sharedElementTextId = getSharedElIdForImageCard(
    card,
    subCategory,
    SHARED_ELEMENTS_TYPES.text,
  );
  const ref = React.useRef();

  const mountedAnimated = React.useRef(new Animated.Value(0)).current;
  const activeIndex = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animation(1, 300).start();
  });
  const animation = (toValue, delay) =>
    Animated.timing(mountedAnimated, {
      toValue,
      duration: 500,
      delay,
      useNativeDriver: true,
    });

  const translateY = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
  });

  const handleChangeCurrentIndex = (newIndex) => {
    ref.current.animateNextTransition();
    setCurrentIndex(newIndex);
  };

  const detailsCategories = DetailsCategory;
  console.log('detailsCategories:', detailsCategories);
  return (
    <View style={[styles.container]}>
      <View style={{width: '100%', height: 300, zIndex: 0}}>
        <View style={{zIndex: 1}}>
          <SharedElement id={sharedElementImageId}>
            <Image style={styles.image} source={{uri: imageUrl}} />
          </SharedElement>
          <SharedElement id={sharedElementTextId}>
            <Text style={styles.mainTitle}>{subCategory.title}</Text>
          </SharedElement>
        </View>
      </View>
      <Animated.View
        style={[
          styles.cardContainer,
          {opacity: mountedAnimated, transform: [{translateY}]},
        ]}>
        <Transitioning.View
          ref={ref}
          transition={transition}
          style={[
            {
              width: '100%',
              flex: 1,
              justifyContent: 'center',
              flexGrow: 1,
            },
          ]}>
          {detailsCategories.map((item, index) => {
            return (
              <Card
                data={detailsCategories}
                key={index}
                card={item}
                cardIndex={index}
                currentIndex={currentIndex}
                handleChangeCurrentIndex={handleChangeCurrentIndex}
                handleImageClick={() => console.log('click')}
              />
            );
          })}
        </Transitioning.View>
      </Animated.View>

      <GoBackBtn navigation={navigation} />
    </View>
  );
}
DetailsScreen.sharedElements = (route, otherRoute, showing) => {
  const {cardIndex, imageIndex} = route.params;
  const card = data[cardIndex];
  const subCategory = card.subCategories[imageIndex];
  const sharedElementImageId = getSharedElIdForImageCard(
    card,
    subCategory,
    SHARED_ELEMENTS_TYPES.image,
  );
  const sharedElementTextId = getSharedElIdForImageCard(
    card,
    subCategory,
    SHARED_ELEMENTS_TYPES.text,
  );
  console.log('sharedElementImageId2:', sharedElementImageId);
  console.log('sharedElementTextId2:', sharedElementTextId);
  return [
    {
      id: sharedElementImageId,
      animation: 'move',
      resize: 'clip',
    },
    {
      id: sharedElementTextId,
      animation: 'fade',
      resize: 'clip',
    },
  ];
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  imageText: {color: 'white', position: 'absolute', bottom: 40, left: 20},
  cardContainer: {
    flexGrow: 1,
    width: '100%',
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: 1,
    marginTop: -30,
  },
  card: {
    // justifyContent: 'flex-start',
    // flexDirection: 'row',
    padding: 20,
    flexGrow: 1,
    width: '100%',
    borderTopRightRadius: 30,
    marginTop: -20,
  },
  cardTitle: {
    color: 'white',
    fontSize: 25,
  },
  mainTitle: {
    color: 'black',
    position: 'absolute',
    bottom: 40,
    left: 20,
    fontSize: 38,
  },
});
