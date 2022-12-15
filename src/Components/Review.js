import {
  Box,
  Button,
  CheckIcon,
  FormControl,
  Heading,
  Select,
  Text,
  TextArea,
  VStack,
} from "native-base";
import Colors from "../color";
import Rating from "./Rating";
import Message from "./Notfications/Message";
import React from "react";
import { AirbnbRating } from "react-native-ratings";
import Buttone from "./Buttone";

function Review() {
  return (
    <Box my={9}>
      <Heading bold fontSize={15} mb={2}>
        Review
      </Heading>
      {/* IF NO REVIEW */}
      {/* <Message color={Colors.white} bg="#FF9900" bold
            children={"No review"} /> */}
      {/* REVIEW */}
      <Box p={3} bg="#F8F8FF" mt={5} rounded={5}>
        <Heading fontSize={15} color={Colors.black}>
          User doe
        </Heading>
        <Rating value={4} />
        <Text my={2} fontSize={11}>
          Jan 12 20022
        </Text>
        <Message
          color={Colors.black}
          bg="white"
          size={10}
          children={
            "Dep lamDep lamDep lamDep lamDep lamDep lamDep lamDep lamDep lam"
          }
        />
      </Box>
      {/* WRITE REVIEW */}
      <Box mt={6}>
        <Heading fontSize={15} bold mb={4}>
          REVIEW THIS PRODUCT
        </Heading>
        <VStack space={6}>
          <FormControl>
            <FormControl.Label
              _text={{
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Rating
            </FormControl.Label>

            <AirbnbRating reviewSize={12} size={25} defaultRating={0} />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Comment
            </FormControl.Label>
            <TextArea
              h={24}
              w="full"
              placeholder="This product........."
              borderWidth={0}
              bg="#F8F8FF"
              py={4}
              _focus={{ bg: "#F8F8FF" }}
            ></TextArea>
          </FormControl>
          <Buttone bg="#EE9A00" color={Colors.white}>
            SUBMIT
          </Buttone>
          {/* If not login */}
          <Message
            color={Colors.white}
            bg={Colors.black}
            size={10}
            children={"Please login to write a review"}
          />
        </VStack>
      </Box>
    </Box>
  );
}

export default Review;
