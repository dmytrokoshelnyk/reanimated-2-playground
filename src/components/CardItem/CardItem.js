import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

export const CardItem = ({
  sharedElementImageId,
  sharedElementTextId,
  handleItemClick,
  imageIndex,
  subCategory,
}) => {
  return (
    <View style={styles.subCategoriesList} key={imageIndex}>
      <TouchableWithoutFeedback onPress={handleItemClick}>
        <View>
          <SharedElement id={sharedElementImageId}>
            <Image style={styles.cardImage} source={{uri: subCategory.url}} />
          </SharedElement>
          <SharedElement id={sharedElementTextId}>
            <Text style={styles.cardTitle}>{subCategory.title}</Text>
          </SharedElement>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },

  subCategoriesList: {
    marginTop: 20,
    width: '100%',
    height: 300,
  },

  cardTitle: {
    color: 'white',
    position: 'absolute',
    bottom: 40,
    left: 20,
    fontSize: 20,
  },
});
