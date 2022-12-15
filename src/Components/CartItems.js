import React from 'react';
import { Box, Center, Pressable, HStack, Text, Image, View, VStack, Button } from 'native-base';
import Colors from '../color';
import {FontAwesome} from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import products from '../data/Products';

const renderItems = (data) => {
    return (
        <Pressable >
            <Box ml={6} mb={3}>
                <HStack alignItems="center" bg={Colors.white} 
                    shadow={1} rounded={10} overflow="hidden">
                    <Center w="25%">
                        <Image source={{uri:data.item.image}} alt={data.item.name} w="full" h={24} 
                            resizeMode="contain" />
                    </Center>
                    <VStack w="60%" px={2} space={2}>
                        <Text isTruncated ellipsizeMode="tail" color={Colors.black} bold fontSize={15}>
                            {data.item.name}
                        </Text>
                        <Text bold color={Colors.lightBlack}>
                            ${data.item.price}
                        </Text>
                    </VStack>
                    <Center>
                        <Button bg={Colors.main} _text={{color: Colors.white,}} _pressed={{bg: Colors.main}}>
                            5
                        </Button>
                    </Center>
                </HStack>
            </Box>
        </Pressable>
    );
    
}

const hiddenItem = () => {
    return(
        <Pressable w={50} roundedTopRight={10} roundedBottomRight={10} h="88%" ml="auto" justifyContent="center" 
        bg={Colors.red}>
            <Center alignItems="center" space={2}>
                <FontAwesome name='trash' size={24} color={Colors.white}/>
            </Center>
        </Pressable>
    );
}

const Swiper = () => {
    return(
        <SwipeListView rightOpenValue={-50} previewRowKey="0"
            previewOpenValue={-40} previewOpenDelay={3000} data={products.slice(0,5)}
            renderItem={renderItems} renderHiddenItem={hiddenItem}
        />
    );
     
}

export default  function CartItems() {
    return (
        <Box mr={6}>
            <Swiper/>
        </Box>
      );
};