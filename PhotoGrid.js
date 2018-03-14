import React, { PureComponent } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

import ImageLoad from "react-native-image-placeholder";

class PhotoGrid extends PureComponent {
  isLastImage = (index, secondViewImages) => {
    const { source, numberImagesToShow } = this.props;

    return (
      (source.length > 5 || numberImagesToShow) &&
      index === secondViewImages.length - 1
    );
  };

  handlePressImage = (event, { image, index }, secondViewImages) =>
    this.props.onPressImage(event, image, {
      isLastImage: index && this.isLastImage(index, secondViewImages),
    });

  render() {
    const { imageProps } = this.props;
    const source = this.props.source.slice(0, 5);
    const firstViewImages = [];
    const secondViewImages = [];
    const firstItemCount = source.length === 5 ? 2 : 1;

    source.forEach((img, index) => {
      if (index === 0) {
        firstViewImages.push(img);
      } else if (index === 1 && firstItemCount === 2) {
        firstViewImages.push(img);
      } else {
        secondViewImages.push(img);
      }
    });

    const { height } = this.props;

    const direction = source.length === 5 ? "row" : "column";

    return source.length ? (
      <View style={[{ flexDirection: direction, height }, this.props.styles]}>
        <View
          style={{
            flex: 2,
            flexDirection: direction === "row" ? "column" : "row",
          }}
        >
          {firstViewImages.map((image, index) => (
            <TouchableOpacity
              activeOpacity={0.7}
              key={index}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={event => this.handlePressImage(event, { image })}
            >
              <ImageLoad
                style={[
                  styles.image,
                  {
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                  },
                  this.props.imageStyle,
                ]}
                source={typeof image === "string" ? { uri: image } : image}
                {...imageProps}
              />
              {image.slice(-3) == "gif" ? (
                <Image
                  style={{
                    width: 60,
                    height: 60,
                  }}
                  source={require("../assets/images/play_icon.png")}
                  {...imageProps}
                />
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
        {secondViewImages.length ? (
          <View
            style={{
              flex: 1,
              flexDirection: direction === "row" ? "column" : "row",
            }}
          >
            {secondViewImages.map((image, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={index}
                style={{ flex: 1 }}
                onPress={event =>
                  this.handlePressImage(
                    event,
                    { image, index },
                    secondViewImages,
                  )
                }
              >
                {this.isLastImage(index, secondViewImages) ? (
                  <ImageBackground
                    style={[styles.image, this.props.imageStyle]}
                    source={typeof image === "string" ? { uri: image } : image}
                  >
                    <View style={styles.lastWrapper}>
                      <Text style={[styles.textCount, this.props.textStyles]}>
                        +{this.props.numberImagesToShow ||
                          this.props.source.length - 5}
                      </Text>
                    </View>
                  </ImageBackground>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ImageLoad
                      style={[
                        styles.image,
                        {
                          position: "absolute",
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0,
                        },
                        this.props.imageStyle,
                      ]}
                      source={
                        typeof image === "string" ? { uri: image } : image
                      }
                      {...imageProps}
                    />
                    {image.slice(-3) == "gif" ? (
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                        }}
                        source={require("../assets/images/play_icon.png")}
                        {...imageProps}
                      />
                    ) : null}
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
      </View>
    ) : null;
  }
}

PhotoGrid.defaultProps = {
  style: {},
  imageStyle: {},
  imageProps: {},
  height: 400,
};

const styles = {
  image: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#fff",
  },
  lastWrapper: {
    flex: 1,
    backgroundColor: "rgba(200, 200, 200, .5)",
    justifyContent: "center",
    alignItems: "center",
  },
  textCount: {
    color: "#fff",
    fontSize: 60,
  },
};

export default PhotoGrid;
