import React from 'react';
import { View, Image, ScrollView, Dimensions, Text, StyleSheet } from 'react-native';

const { width } = Dimensions.get("window");
const height = width * 0.6;

export default class Slider extends React.Component {
    state = {
        active: 0
    }

    change = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMesurement.width);
        if (slide !== this.state.active) {
            this.setState({ active: slide })
        }
    }
    //    } change = () => {

    //     }

    render() {
        return (
            <View style={style.container}>
                <ScrollView
                    pagingEnabled
                    horizontal
                    // onScroll={this.change}
                    showsHorizontalScrollIndicator={false}
                    style={style.container}
                >
                    {
                        this.props.images.map((image, index) => (
                            console.log(image, 'irl'),
                            <Image
                                key={index}
                                source={image.url}
                                style={style.image} />
                        ))
                    }
                </ScrollView>
                <View style={style.pagination}>
                    {
                        this.props.images.map((i, k) => (
                            <Text key={k} style={k == this.state.active ? style.paginationText : style.pagingActiveText}>
                                ⚪
                            </Text>
                        ))
                    }

                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        marginTop: 50, width, height,
    },
    scroll: { width, height },
    image: { width, height, resizeMode: 'cover' },
    pagination: {
        flexDirection: 'row', position: 'absolute', bottom: 0, alignSelf: 'center'
    },
    paginationText: { fontSize: (width / 30), color: '#888', margin: 3 },
    pagingActiveText: { fontSize: (width / 30), color: '#FFF', margin: 3 }

})
