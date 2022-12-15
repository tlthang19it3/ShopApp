import React, { useState } from "react";
import { Image, View, ScrollView, Text } from "native-base";
const imageSlide = [
  require("../../assets/slide1.png"),
  require("../../assets/slide2.png"),
  require("../../assets/slide3.png"),
  require("../../assets/slide4.png"),
];

function SlideScreen() {
  const [imgActive, setImageActive] = useState(0);

  const onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide != imgActive) {
        setImageActive(slide);
      }
    }
  };
  return (
    <View mt={2} bg="white">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        onScroll={({ nativeEvent }) => onchange(nativeEvent)}
      >
        {imageSlide.map((e, index) => (
          <Image
            key={index}
            resizeMode="stretch"
            alt="slide"
            source={e}
            w={400}
            h={150}
          />
        ))}
      </ScrollView>
      <View
        position="absolute"
        flexDirection="row"
        alignSelf="center"
        bottom={0}
      >
        {imageSlide.map((e, index) => (
          <Text
            key={e}
            fontSize={30}
            style={
              imgActive == index
                ? { color: "black", margin: 3 }
                : { color: "white", margin: 3 }
            }
          >
            •
          </Text>
        ))}
      </View>
    </View>
  );
}

export default SlideScreen;
