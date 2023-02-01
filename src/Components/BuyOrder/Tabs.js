import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "native-base";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useWindowDimensions, StyleSheet } from "react-native";
import Colors from "../../color";
import axios from "axios";
import { Storage } from "expo-storage";
import Waiting from "./Waiting";
import Processing from "./Processing";
import Shipping from "./Shipping";
import Success from "./Success";
import Reject from "./Reject";
const Url = `https://server-shop-app.onrender.com`;

export default function Tabs() {
  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "first":
        return <Waiting />;
      case "second":
        return <Processing />;
      case "third":
        return <Shipping />;
      case "forth":
        return <Success />;
      case "fifth":
        return <Reject />;
    }
  };
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "first",
      title: "Chờ xác nhận",
    },
    {
      key: "second",
      title: "Đang xử lý",
    },
    {
      key: "third",
      title: "Đang giao",
    },
    {
      key: "forth",
      title: "Đã giao",
    },
    {
      key: "fifth",
      title: "Bị từ chối",
    },
  ]);

  const renderTabsBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled={true}
      tabStyle={styles.tabStyle}
      style={{ elevation: 1, backgroundColor: Colors.white }}
      {...props}
      activeColor="#FFA500"
      inactiveColor="gray"
      pressColor="white"
      renderLabel={({ route, color }) => (
        <Text style={{ color, ...styles.text }}>{route.title}</Text>
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabsBar}
    />
  );
}

const styles = StyleSheet.create({
  tabStyle: {
    width: 100,
  },
  text: {
    fontSize: 13,
    fontWeight: "bold",
  },
});
