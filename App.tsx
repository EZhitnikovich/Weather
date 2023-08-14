import { StatusBar } from "expo-status-bar";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "./theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";

export default function App() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState(["a", "b", "c"]);

  const handleLocation = (loc: string) => {
    console.log(loc);
  };
  return (
    <View className="relative flex-1">
      <StatusBar style="light" />
      <Image
        blurRadius={80}
        source={require("./assets/images/bg.png")}
        className="absolute h-full w-full"
      />
      <SafeAreaView className="flex flex-1">
        {/* search section */}
        <View style={{ height: "7%" }} className="mx-4 relative z-50">
          <View
            className="flex-row justify-end items-center rounded-full"
            style={{
              backgroundColor: showSearch ? theme.bgWhite(0.2) : "transparent",
            }}
          >
            {showSearch ? (
              <TextInput
                placeholder="Search city"
                placeholderTextColor={"lightgrey"}
                className="pl-6 h-10 flex-1 text-base text-white"
              />
            ) : null}
            <TouchableOpacity
              onPress={() => toggleSearch(!showSearch)}
              style={{ backgroundColor: theme.bgWhite(0.3) }}
              className="rounded-full p-3 m-1"
            >
              <MagnifyingGlassIcon size={25} color="white" />
            </TouchableOpacity>
          </View>
          {locations.length > 0 && showSearch ? (
            <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
              {locations.map((loc, index) => {
                let showBorder = index + 1 != locations.length;
                let borderClass = showBorder
                  ? " border-b-2 border-b-gray-400"
                  : "";
                return (
                  <TouchableOpacity
                    onPress={() => handleLocation(loc)}
                    key={index}
                    className={
                      "flex-row items-center border-0 p-3 px-4 mb-1" +
                      borderClass
                    }
                  >
                    <MapPinIcon size={20} color={"grey"} />
                    <Text className="text-black text-lg ml-2">{loc}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
        {/* forecast section */}
        <View className="mx-4 flex justify-around flex-1 mb-2">
          {/* location */}
          <Text className="text-white text-center text-2xl font-bold">
            City,
            <Text className="text-lg font-semibold text-gray-200">
              {" "}
              Country
            </Text>
          </Text>
          {/* weather image */}
          <View className="flex-row justify-center">
            <Image
              source={require("./assets/images/bg.png")}
              className="w-52 h-52"
            />
          </View>
          {/* degree celsius */}
          <View className="space-y-2">
            <Text className="text-center font-bold text-white text-5xl ml-5">
              23&#176;
            </Text>
            <Text className="text-center text-white text-xl tracking-widest">
              Cloudly
            </Text>
          </View>
          {/* other stats; icons from https://iconscout.com/icons */}
          <View className="flex-row justify-between mx-4">
            {/* wind */}
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("./assets/images/windy.png")}
                className="w-6 h-6"
                tintColor={"white"}
              />
              <Text className="text-white font-semibold text-base">22km</Text>
            </View>
            {/* humidity */}
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("./assets/images/humidity.png")}
                className="w-6 h-6"
                tintColor={"white"}
              />
              <Text className="text-white font-semibold text-base">23%</Text>
            </View>
            {/* sunrise */}
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("./assets/images/sunrise.png")}
                className="w-6 h-6"
                tintColor={"white"}
              />
              <Text className="text-white font-semibold text-base">6:05am</Text>
            </View>
          </View>
          {/* forecast for nex days */}
          <View className="mb-2 space-y-3">
            <View className="flex-row items-center mx-3 space-x-2">
              <CalendarDaysIcon size={22} color={"white"} />
              <Text className="text-white text-base">Daily forecast</Text>
            </View>
            <View className="flex-row justify-between mx-3">
              {/* one forecast */}
              <View
                className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1"
                style={{ backgroundColor: theme.bgWhite(0.5) }}
              >
                <Image
                  source={require("./assets/images/bg.png")}
                  className="h-11 w-11"
                />
                <Text className="text-white">Monday</Text>
                <Text className="text-white text-xl font-semibold">
                  23&#176;
                </Text>
              </View>
              {/* one forecast */}
              <View
                className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1"
                style={{ backgroundColor: theme.bgWhite(0.5) }}
              >
                <Image
                  source={require("./assets/images/bg.png")}
                  className="h-11 w-11"
                />
                <Text className="text-white">Monday</Text>
                <Text className="text-white text-xl font-semibold">
                  23&#176;
                </Text>
              </View>
              {/* one forecast */}
              <View
                className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1"
                style={{ backgroundColor: theme.bgWhite(0.5) }}
              >
                <Image
                  source={require("./assets/images/bg.png")}
                  className="h-11 w-11"
                />
                <Text className="text-white">Monday</Text>
                <Text className="text-white text-xl font-semibold">
                  23&#176;
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
