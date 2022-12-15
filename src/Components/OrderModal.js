import React, { useState } from "react";
import {
  Center,
  Modal,
  Text,
  HStack,
  VStack,
  Button,
  Pressable,
  Image,
} from "native-base";
import Colors from "../color";
import Buttone from "./Buttone";
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
function OrderModal() {
  const [showModel, setShowModel] = useState(false);
  return (
    <Center>
      <Buttone
        onPress={() => setShowModel(true)}
        bg={Colors.main}
        color={Colors.white}
        mt={5}
      >
        SHOW PAYMENT & TOTAL
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
            <Pressable
              w="full"
              justifyContent="center"
              bg={Colors.paypal}
              h={45}
              rounded={3}
              overflow="hidden"
              onPress={() => setShowModel(false)}
            >
              <Image
                source={{
                  uri: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c530.png",
                }}
                alt="paypal"
                resizeMode="contain"
                w="full" h={34}
              ></Image>
            </Pressable>
            <Button
              w="full"
              mt={2}
              bg={Colors.black}
              h={45}
              _text={{ color: Colors.white }}
              onPress={() => setShowModel(false)}
              _pressed={{ bg: Colors.black }}
            >
              PAY LATER
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
}

export default OrderModal;
