import { BadgeCheckIcon, ChipIcon, CubeIcon } from "@heroicons/react/solid";
import React from "react";
import { skills } from "../data";

import {
  ScrollView,
  Animated,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from "react-native"

const OFFSET = 60
const ITEM_WIDTH = Dimensions.get("window").width - (OFFSET * 2)
const ITEM_HEIGHT = 400

const cards = [
  { title: "Movie 1", posterUrl: require("./images/dummy1.jpeg") },
  { title: "Movie 2", posterUrl: require("./images/dummy2.jpeg") },
  { title: "Movie 3", posterUrl: require("./images/dummy3.jpeg") },
  { title: "Movie 4", posterUrl: require("./images/dummy4.jpeg") },
  { title: "Movie 5", posterUrl: require("./images/dummy5.jpeg") },
]

export default function AdvancedCardCarousel() {

  const scrollX = React.useRef(new Animated.Value(0)).current

  return (
    <section id="netflix" className="text-gray-400 bg-gray-900 body-font">


    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView
        horizontal={true}
        decelerationRate={"normal"}
        snapToInterval={ITEM_WIDTH}
        style={{ marginTop: 40, paddingHorizontal: 0 }}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        disableIntervalMomentum
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={12}
      >
        {cards.map((item, idx) => {
          const inputRange = [
            (idx - 1) * ITEM_WIDTH,
            idx * ITEM_WIDTH,
            (idx + 1) * ITEM_WIDTH,
          ]

          const translate = scrollX.interpolate({
            inputRange,
            outputRange: [0.85, 1, 0.85],
          })

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
          })

          return (
            <Animated.View
              style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                marginLeft: idx === 0 ? OFFSET : undefined,
                marginRight: idx === cards.length - 1 ? OFFSET : undefined,
                opacity: opacity,
                transform: [{ scale: translate }],
              }}
            >
              <ImageBackground
                source={item.posterUrl}
                style={{
                  flex: 1,
                  resizeMode: "cover",
                  justifyContent: "center",
                }}
                imageStyle={{ borderRadius: 6}}
              />
            </Animated.View>
          )
        })}
      </ScrollView>
    </SafeAreaView>


    </section>
  )
}

