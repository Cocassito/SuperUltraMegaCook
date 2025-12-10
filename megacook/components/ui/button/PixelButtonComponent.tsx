import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  GestureResponderEvent,
} from "react-native";

interface ButtonPixelProps {
  title?: string;
  colorPrimary: string;
  colorSecondary: string;
  colorBorder: string;
  colorInnerShadow: string;
  colorIcon?: string;
  icon?: React.ReactElement;
  onPress?: (event: GestureResponderEvent) => void;
  useMarginLeft?: boolean;
  useMarginTop?: boolean;
  marginLeft?: number;
  marginTop?: number;
}

export default function PixelButton({
  title,
  colorPrimary,
  colorSecondary,
  colorBorder,
  colorInnerShadow,
  colorIcon,
  icon,
  useMarginLeft = false,
  useMarginTop = false,
  marginLeft = PIXEL * 3,
  marginTop = PIXEL,
  onPress,
}: ButtonPixelProps) {
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  return (
    <>
      <View
        style={[
          styles.wrapper,
          {
            marginLeft: useMarginLeft ? marginLeft : 0,
            marginTop: useMarginTop ? marginTop : 0,
          },
        ]}
        onLayout={(e) => setSize(e.nativeEvent.layout)}
      >
        <View
          style={[
            styles.container2,
            {
              width: size.width,
              height: size.height + 1,
              backgroundColor: colorSecondary,
            },
          ]}
        />
        <View style={[styles.dot2Left, { backgroundColor: colorSecondary }]} />
        <View style={[styles.dot2Left2, { backgroundColor: colorSecondary }]} />

        <View style={[styles.dot2Left3, { backgroundColor: colorSecondary }]} />
        <View style={[styles.dot2Left4, { backgroundColor: colorBorder }]} />

        <View style={[styles.left2Black, { backgroundColor: colorBorder }]} />
        <View style={[styles.left2Black2, { backgroundColor: colorBorder }]} />
        <View style={[styles.left2Black3, { backgroundColor: colorBorder }]} />

        <View style={[styles.bottomBlack, { backgroundColor: colorBorder }]} />

        <Pressable
          onPress={onPress}
          style={({ pressed }) => [styles.container, pressed && styles.active]}
        >
          {/* LEFT JPP PTN DE BUTTON */}
          <View style={[styles.topBlack, { backgroundColor: colorBorder }]} />
          <View
            style={[styles.leftBlack2, { backgroundColor: colorInnerShadow }]}
          />
          <View
            style={[styles.leftBlack3, { backgroundColor: colorInnerShadow }]}
          />
          <View
            style={[styles.leftBlack4, { backgroundColor: colorSecondary }]}
          />
          <View
            style={[styles.leftBlack5, { backgroundColor: colorSecondary }]}
          />

          <View style={[styles.dotLeft, { backgroundColor: colorBorder }]} />
          <View style={[styles.dotLeft2, { backgroundColor: colorBorder }]} />
          <View style={[styles.dotLeft3, { backgroundColor: colorBorder }]} />

          <View style={[styles.leftBlack, { backgroundColor: colorPrimary }]} />

          <View style={[styles.leftBlack6, { backgroundColor: colorBorder }]} />
          <View
            style={[styles.leftBlack7, { backgroundColor: colorPrimary }]}
          />

          {/* RIGHT JPP PTN DE BUTTON */}

          <View style={[styles.leftSide, styles.rightSideMirror]}>
            <View style={[styles.topBlack, { backgroundColor: colorBorder }]} />
            <View
              style={[styles.leftBlack2, { backgroundColor: colorInnerShadow }]}
            />
            <View
              style={[styles.leftBlack3, { backgroundColor: colorInnerShadow }]}
            />
            <View
              style={[styles.leftBlack4, { backgroundColor: colorSecondary }]}
            />
            <View
              style={[styles.leftBlack5, { backgroundColor: colorSecondary }]}
            />
            <View style={[styles.dotLeft, { backgroundColor: colorBorder }]} />
            <View style={[styles.dotLeft2, { backgroundColor: colorBorder }]} />
            <View style={[styles.dotLeft3, { backgroundColor: colorBorder }]} />
            <View
              style={[styles.leftBlack, { backgroundColor: colorPrimary }]}
            />
            <View
              style={[styles.leftBlack6, { backgroundColor: colorBorder }]}
            />
            <View
              style={[styles.leftBlack7, { backgroundColor: colorPrimary }]}
            />
          </View>

          <View
            style={[
              styles.button,
              {
                backgroundColor: colorPrimary,
                paddingVertical: icon ? 8 : 2,
                paddingHorizontal: icon ? 4 : 20,
              },
            ]}
          >
            <View
              style={[
                styles.innerHighlight,
                { backgroundColor: colorInnerShadow },
              ]}
            />
            <View
              style={[styles.innerShadow, { backgroundColor: colorSecondary }]}
            />
            {icon ? (
              React.cloneElement(icon, { fill: colorIcon } as any)
            ) : (
              <Text style={styles.text}>{title}</Text>
            )}
          </View>
        </Pressable>

        <View style={[styles.leftSide, styles.rightSideMirror]}>
          <View
            style={[styles.dot2Left, { backgroundColor: colorSecondary }]}
          />
          <View
            style={[styles.dot2Left2, { backgroundColor: colorSecondary }]}
          />
          <View
            style={[styles.dot2Left3, { backgroundColor: colorSecondary }]}
          />
          <View style={[styles.dot2Left4, { backgroundColor: colorBorder }]} />

          <View style={[styles.left2Black, { backgroundColor: colorBorder }]} />
          <View
            style={[styles.left2Black2, { backgroundColor: colorBorder }]}
          />
          <View
            style={[styles.left2Black3, { backgroundColor: colorBorder }]}
          />
        </View>
      </View>
    </>
  );
}

const PIXEL = 4;

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    alignSelf: "center",
    boxSizing: "border-box",
  },

  container: {
    position: "relative",
    zIndex: 2, // devant
  },

  container2: {
    position: "absolute",
    top: PIXEL,
    left: 0,
    zIndex: 1, // derrière
  },

  leftSide: {
    position: "absolute",
    top: 0,
    left: 0,
  },

  rightSideMirror: {
    left: "auto",
    right: 0,
    transform: [{ scaleX: -1 }],
  },

  active: {
    transform: [{ translateY: PIXEL * 0.85 }],
  },

  topBlack: {
    position: "absolute",
    top: -PIXEL,
    left: 0,
    right: 0,
    height: PIXEL,
  },

  //////////////////
  //LEFT
  leftBlack2: {
    position: "absolute",
    top: PIXEL,
    left: -PIXEL,
    right: 0,
    height: PIXEL,
    width: PIXEL,
  },
  leftBlack3: {
    position: "absolute",
    top: PIXEL * 2,
    left: -PIXEL * 2,
    right: 0,
    height: PIXEL,
    width: PIXEL,
  },

  leftBlack4: {
    position: "absolute",
    top: PIXEL * 7,
    left: -PIXEL,
    right: 0,
    height: PIXEL,
    width: PIXEL,
  },
  leftBlack5: {
    position: "absolute",
    top: PIXEL * 6,
    left: -PIXEL * 2,
    right: 0,
    height: PIXEL,
    width: PIXEL,
  },

  leftBlack: {
    position: "absolute",
    top: PIXEL * 2,
    bottom: 0,
    left: -PIXEL,
    width: PIXEL,
    height: PIXEL * 5,
  },

  leftBlack6: {
    position: "absolute",
    top: PIXEL * 2,
    bottom: 0,
    left: -PIXEL * 3,
    width: PIXEL,
    height: PIXEL * 5,
  },

  leftBlack7: {
    position: "absolute",
    top: PIXEL * 3,
    bottom: 0,
    left: -PIXEL * 2,
    width: PIXEL * 2,
    height: PIXEL * 3,
  },

  dotLeft: {
    position: "absolute",
    top: PIXEL,
    bottom: 0,
    left: -PIXEL * 3,
    width: PIXEL * 2,
    height: PIXEL,
  },

  dotLeft2: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: -PIXEL * 2,
    width: PIXEL * 2,
    height: PIXEL,
  },
  dotLeft3: {
    position: "absolute",
    top: -PIXEL,
    bottom: 0,
    left: -PIXEL,
    width: PIXEL,
    height: PIXEL,
  },

  dotLeft4: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: -PIXEL * 2,
    width: PIXEL * 2,
    height: PIXEL,
  },
  //////////////////////////SUITE LEFT MAIS CONTAINER 2///////////////////////////////

  dot2Left: {
    position: "absolute",
    top: PIXEL * 7,
    bottom: 0,
    left: -PIXEL * 2,
    width: PIXEL,
    height: PIXEL * 2,
  },

  dot2Left2: {
    position: "absolute",
    top: PIXEL * 7,
    bottom: 0,
    left: -PIXEL,
    width: PIXEL,
    height: PIXEL * 3,
  },

  dot2Left3: {
    position: "absolute",
    top: PIXEL * 8,
    bottom: 0,
    left: -PIXEL * 2,
    width: PIXEL,
    height: PIXEL,
  },

  dot2Left4: {
    position: "absolute",
    top: PIXEL * 9.8,
    bottom: 0,
    left: -PIXEL,
    width: PIXEL,
    height: PIXEL,
  },

  left2Black: {
    position: "absolute",
    top: PIXEL * 7,
    bottom: 0,
    left: -PIXEL * 3,
    width: PIXEL,
    height: PIXEL * 2,
  },

  left2Black3: {
    position: "absolute",
    top: PIXEL * 8,
    bottom: 0,
    left: -PIXEL * 2,
    width: PIXEL,
    height: PIXEL,
  },
  left2Black2: {
    position: "absolute",
    top: PIXEL * 9,
    bottom: 0,
    left: -PIXEL * 2,
    width: PIXEL * 2,
    height: PIXEL,
  },

  /////////////////////////////

  bottomBlack: {
    position: "absolute",
    bottom: -PIXEL * 2.1,
    left: 0,
    right: 0,
    height: PIXEL,
    zIndex: 10,
  },

  button: {
    position: "relative",
  },
  button2: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  innerHighlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: PIXEL,
  },

  innerShadow: {
    position: "absolute",
    bottom: -2,
    left: 0,
    right: 0,
    height: PIXEL,
  },

  text: {
    fontSize: 20,
    color: "#5A2B87",
    fontFamily: "pixelgridtrial-linedownboldm",
    textAlign: "center",
  },
});
