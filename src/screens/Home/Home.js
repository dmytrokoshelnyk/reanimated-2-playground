import React from 'react';
import {StyleSheet, View} from 'react-native';
import data from '../../../data';
import {Transition, Transitioning} from 'react-native-reanimated';
import {Card} from '../../components/Card/Card';

// Index of pre open item in a list
export const PRE_SELECTED_ITEM_INDEX = 2;

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={500} />
    <Transition.Change type="fade" durationMs={500} />
    <Transition.Out type="fade" durationMs={5000} />
  </Transition.Together>
);

const HomeScreen = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const ref = React.useRef();
  const isDefaultRenderState = currentIndex === null;

  const handleImageClick = (cardIndex, imageIndex) => {
    // Track click on pre default state. Open full card
    if (isDefaultRenderState) {
      handleChangeCurrentIndex(cardIndex);
    }
    // If card already opened. Navigation to next screen
    if (currentIndex === cardIndex) {
      navigation.push('Details', {cardIndex, imageIndex});
    }
  };

  const handleChangeCurrentIndex = (newIndex) => {
    ref.current.animateNextTransition();
    setCurrentIndex(newIndex);
  };

  return (
    <View style={styles.appContainer}>
      <Transitioning.View
        ref={ref}
        transition={transition}
        style={styles.container}>
        {data.map((card, cardIndex) => {
          return (
            <Card
              data={data}
              key={cardIndex}
              card={card}
              cardIndex={cardIndex}
              currentIndex={currentIndex}
              handleChangeCurrentIndex={handleChangeCurrentIndex}
              handleImageClick={handleImageClick}
            />
          );
        })}
      </Transitioning.View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#181818',
  },
  container: {
    flex: 1,
    backgroundColor: '#181818',
    justifyContent: 'center',
    marginTop: 40,
  },
  cardContainer: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
    borderTopRightRadius: 50,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  heading: {
    marginTop: 30,
    fontSize: 38,
    fontWeight: '300',
    width: '50%',
    // textTransform: 'uppercase',
    letterSpacing: -2,
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: 'center',
  },
  subCategoriesList: {
    marginTop: 20,
    width: '100%',
    height: 300,
  },
  scrollView: {
    flex: 1,
    height: '100%',
    width: '100%',
    marginTop: 20,
  },
});
