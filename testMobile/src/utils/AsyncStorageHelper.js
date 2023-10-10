import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchData = async key => {
  let ans = null;
  await AsyncStorage.getItem(key)
    .then(value => (ans = value))
    .catch(error =>
      console.log(`Error getting ${key} from AsyncStorage: `, error),
    );
  return ans;
};

export const putData = async (key, value) => {
  await AsyncStorage.setItem(key, value).catch(error =>
    console.log(`Error putting ${key} into AsyncStorage: `, error),
  );
};

export const clearAsyncStorage = async () => AsyncStorage.clear();
