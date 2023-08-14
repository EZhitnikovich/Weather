import { StatusBar } from "expo-status-bar";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { theme } from "./theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import {
  Forecast,
  fetchLocations,
  fetchWeatherForecast,
  location,
} from "./api/weather";

import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";
import { getData, storeData } from "./utils/asyncStorage";

const storageKey = "weather-city";

export default function App() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState<location[]>([]);
  const [weather, setWeather] = useState<Forecast>();
  const [loading, setLoading] = useState(true);

  const handleLocation = (loc: location) => {
    setLocations([]);
    toggleSearch(false);
    setLoading(true);
    fetchWeatherForecast({ cityName: loc.name, days: 3 }).then((data) => {
      if (data !== null) {
        setWeather(data);
        setLoading(false);
        storeData(storageKey, loc.name);
      }
    });
  };

  const handleSearch = (value: string) => {
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => {
        if (data !== null) setLocations(data);
        else setLocations([]);
      });
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData(storageKey);
    let cityName = "Minsk";
    if (myCity) cityName = myCity;
    fetchWeatherForecast({
      cityName: cityName,
      days: 3,
    }).then((data) => {
      if (data !== null) {
        setWeather(data);
        setLoading(false);
      }
    });
  };

  return (
    <View className="relative flex-1">
      <StatusBar style="light" />
      <Image
        blurRadius={80}
        source={require("./assets/images/bg.png")}
        className="absolute h-full w-full"
      />
      {loading ? (
        <View className="flex-1 flex-row justify-center items-center">
          <Text className="text-white text-4xl">Loading...</Text>
        </View>
      ) : (
        <SafeAreaView className="flex flex-1">
          {/* search section */}
          <View style={{ height: "7%" }} className="mx-4 relative z-50">
            <View
              className="flex-row justify-end items-center rounded-full"
              style={{
                backgroundColor: showSearch
                  ? theme.bgWhite(0.2)
                  : "transparent",
              }}
            >
              {showSearch ? (
                <TextInput
                  onChangeText={handleTextDebounce}
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
                {locations.map((loc: location, index) => {
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
                      <Text className="text-black text-lg ml-2">
                        {loc?.name}, {loc?.country}
                      </Text>
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
              {weather?.location?.name},
              <Text className="text-lg font-semibold text-gray-200">
                {" "}
                {" " + weather?.location.country}
              </Text>
            </Text>
            {/* weather image */}
            <View className="flex-row justify-center">
              <Image
                source={{ uri: "https:" + weather?.current.condition.icon }}
                className="w-52 h-52"
              />
            </View>
            {/* degree celsius */}
            <View className="space-y-2">
              <Text className="text-center font-bold text-white text-5xl ml-5">
                {weather?.current.temp_c}&#176;
              </Text>
              <Text className="text-center text-white text-xl tracking-widest">
                {weather?.current.condition.text}
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
                <Text className="text-white font-semibold text-base">
                  {weather?.current.wind_kph}km
                </Text>
              </View>
              {/* humidity */}
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("./assets/images/humidity.png")}
                  className="w-6 h-6"
                  tintColor={"white"}
                />
                <Text className="text-white font-semibold text-base">
                  {weather?.current.humidity}%
                </Text>
              </View>
              {/* sunrise */}
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("./assets/images/sunrise.png")}
                  className="w-6 h-6"
                  tintColor={"white"}
                />
                <Text className="text-white font-semibold text-base">
                  {weather?.forecast.forecastday[0].astro.sunrise}
                </Text>
              </View>
            </View>
            {/* forecast for next days */}
            <View className="mb-2 space-y-3">
              <View className="flex-row items-center mx-3 space-x-2">
                <CalendarDaysIcon size={22} color={"white"} />
                <Text className="text-white text-base">Daily forecast</Text>
              </View>
              <View className="flex-row justify-between mx-3">
                {weather?.forecast.forecastday.map((forecast, index) => {
                  let date = new Date(forecast.date);
                  let dayName = date.toLocaleDateString("en-US", {
                    weekday: "long",
                  });
                  dayName = dayName.split(",")[0];
                  return (
                    <View
                      key={index}
                      className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1"
                      style={{ backgroundColor: theme.bgWhite(0.5) }}
                    >
                      <Image
                        source={{
                          uri: "https:" + forecast.day.condition.icon,
                        }}
                        className="h-11 w-11"
                      />
                      <Text className="text-white">{dayName}</Text>
                      <Text className="text-white text-xl font-semibold">
                        {forecast.day.avgtemp_c}&#176;
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
