import React, { useState } from "react";
import { Center, Modal, Text, HStack, VStack, Button } from "native-base";
import Colors from "../color";
import Buttone from "./Buttone";
import { useNavigation } from "@react-navigation/native";
const orderInfo = [
  {
    title: "Products",
    price: 125,
    color: "black",
  },
  {
    title: "Shipping",
    price: 30.2,
    color: "black",
  },
  {
    title: "Tax",
    price: 15.5,
    color: "black",
  },
  {
    title: "Total amount",
    price: 170,
    color: "main",
  },
];
function PlaceOrderModal() {
  const [showModel, setShowModel] = useState(false);
  const navigation = useNavigation();
  return (
    <Center>
      <Buttone
        onPress={() => setShowModel(true)}
        bg={Colors.black}
        color={Colors.white}
        mt={5}
      >
        SHOW TOTAL
      </Buttone>
      <Modal isOpen={showModel} onClose={() => setShowModel(false)} size="lg">
        <Modal.Content maxWidth={350}>
          <Modal.CloseButton />
          <Modal.Header>Order</Modal.Header>
          <Modal.Body>
            <VStack space={5}>
              {orderInfo.map((i, index) => (
                <HStack
                  key={index}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text fontWeight="medium">{i.title}</Text>
                  <Text
                    color={i.color === "main" ? Colors.main : Colors.black}
                    bold
                  >
                    {i.price}$
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex={1}
              bg={Colors.main}
              h={45}
              _text={{ color: Colors.white }}
              onPress={() => {setShowModel(false);navigation.navigate('Order')}}
              _pressed={{ bg: Colors.main }}
            >
              PLACE AN ORDER
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
}

export default PlaceOrderModal;
