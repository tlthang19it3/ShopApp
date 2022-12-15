import React from 'react';
import { View, Text, Box, Center } from 'native-base';
import Colors from '../color';
import {FontAwesome} from '@expo/vector-icons';
import Buttone from './Buttone';

function CartEmpty() {
  return (
    <Box flex={1} px={4}>
        <Center h="90%">
            <Center w={200} h={200} bg={Colors.white} rounded="full">
                <FontAwesome name="shopping-basket" size={64} color={Colors.main} />
                <Text color={Colors.main} bold mt={5} >
                    CART IS EMPTY
                </Text>
            </Center>
        </Center>
        <Buttone bg={Colors.black} color={Colors.white}>
            START SHOPPING
        </Buttone>
    </Box>
  );
}

export default CartEmpty;