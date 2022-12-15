import { Button, Image, Modal, Text, TextArea, View } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { StorageClient } from "@supabase/storage-js";
import * as ImagePicker from "expo-image-picker";

function TestScreen() {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const avatarSize = { height: 150, width: 150 };
  const [image, setImage] = useState([]);
  const [base64, setBase64] = useState(null);
  const STORAGE_URL = "https://ngfxbagkjhxyputmwoxp.supabase.co/storage/v1";
  const SERVICE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nZnhiYWdramh4eXB1dG13b3hwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MDIyMDE2NSwiZXhwIjoxOTg1Nzk2MTY1fQ.v1Bml2eA_eQno7gMBfDbtgLiyovkVs9orOz1w_89aVI"; //! service key, not anon key

  const storageClient = new StorageClient(STORAGE_URL, {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
  });
  useEffect(() => {
    console.log(image);
  }, [image]);
  async function get() {
    const { data, error } = await storageClient
      .from("ecomme")
      .getPublicUrl(image);
    setAvatarUrl(data.publicUrl);
  }
  async function uploadAvatar() {
    try {
      setUploading(true);

      let result = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });
      setBase64(result.assets[0].base64);
      const fileName = result.assets[0].uri.replace(/^.*[\\\/]/, "");
      const ext = result.assets[0].uri.substring(
        result.assets[0].uri.lastIndexOf(".") + 1
      );

      const formData = new FormData();
      formData.append("files", {
        uri: result.assets[0].uri,
        name: fileName,
        type: `image/${ext}`,
      });

      const { data, error } = await storageClient
        .from("image")
        .update("335d3db8-0b58-4443-b43e-18fdb3fd7c41.jpeg", formData);
      console.log(data);
      // if (error) {
      //   throw error;
      // }
      // console.log(fileName);
      // if (!result.canceled) {
      //   setImage(fileName);
      //   console.log(fileName);
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  }
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View>
      <View>
        <Modal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          avoidKeyboard
          bottom="4"
          size="full"
        >
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Mời bạn đánh giá Vũ phong</Modal.Header>
            <Modal.Body>
              <Text bold mb={5}>
                Trải nghiệm của bạn với vũ phong như thế nào
              </Text>
              <TextArea
                height={40}
                placeholder="Chia sẻ thêm về trải nghiệm mua bán của bạn"
                alignItems="stretch"
                _focus={{ borderColor: "gray.500", bg: "white" }}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                flex="1"
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                Đánh giá
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        <Button
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          Comment
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 5,
    overflow: "hidden",
    maxWidth: "100%",
  },
  image: {
    objectFit: "cover",
    paddingTop: 0,
  },
  noImage: {
    backgroundColor: "#333",
    border: "1px solid rgb(200, 200, 200)",
    borderRadius: 5,
  },
});
export default TestScreen;
