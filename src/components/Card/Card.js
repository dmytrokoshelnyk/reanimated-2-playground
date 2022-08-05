import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getSharedElIdForImageCard} from '../../util/util';
import {CardItem} from '../CardItem/CardItem';
import {PRE_SELECTED_ITEM_INDEX} from '../../screens/Home/Home';

export const SELECTED_GROW = 20;
export const SHARED_ELEMENTS_TYPES = {
  image: 'image',
  text: 'text',
};

export const Card = ({
  data,
  card,
  cardIndex,
  currentIndex,
  handleChangeCurrentIndex,
  handleImageClick,
}) => {
  const {bg, color, category, subCategories = []} = card;

  const isSelected = currentIndex === cardIndex;
  const defaultGrow = cardIndex === PRE_SELECTED_ITEM_INDEX ? 1 : 0;

  const isRenderTitle = currentIndex === null || isSelected;

  const growStyles = [
    {flexGrow: defaultGrow},
    {flexGrow: isSelected ? SELECTED_GROW : defaultGrow},
  ];

  const cardBgColor = cardIndex > 0 ? data[cardIndex - 1].bg : 'transparent';

  return (
    <TouchableOpacity
      key={category}
      onPress={() => {
        const newIndex = cardIndex === currentIndex ? null : cardIndex;
        handleChangeCurrentIndex(newIndex);
      }}
      style={[
        styles.cardContainer,
        ...growStyles,
        {backgroundColor: cardBgColor},
      ]}
      activeOpacity={0.9}>
      <View style={[styles.card, {backgroundColor: bg}, ...growStyles]}>
        {isRenderTitle && (
          <>
            <Text numberOfLines={2} style={[styles.heading, {color}]}>
              {category}
            </Text>
            <ScrollView style={styles.scrollView}>
              {subCategories.map((subCategory, imageIndex) => {
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
                const handleItemClick = () =>
                  handleImageClick(cardIndex, imageIndex);

                return (
                  <CardItem
                    key={`${subCategory.id}`}
                    imageIndex={imageIndex}
                    handleItemClick={handleItemClick}
                    sharedElementImageId={sharedElementImageId}
                    sharedElementTextId={sharedElementTextId}
                    subCategory={subCategory}
                  />
                );
              })}
            </ScrollView>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    width: '80%',
  },
  scrollView: {
    flex: 1,
    height: '100%',
    width: '100%',
    marginTop: 20,
  },
});
