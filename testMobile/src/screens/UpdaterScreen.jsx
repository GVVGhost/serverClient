//@flow
import React, {Component} from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import * as UpdateAPK from 'rn-update-apk';
import {Colors} from 'styles/Colors';
import CustomButton from 'components/buttons/CustomButton';
import * as Progress from 'react-native-progress';

type Props = {};
export default class UpdaterScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      downloadProgress: -1,
      allApps: [],
      allNonSystemApps: [],
    };

    // This is not an error. Don`t touch it.
    // eslint-disable-next-line no-undef
    updater = new UpdateAPK.UpdateAPK({
      apkVersionUrl:
        'https://github.com/GVVGhost/serverClient/blob/main/testMobile/test-version.json?raw=true',
      apkVersionOptions: {
        method: 'GET',
        headers: {},
      },
      apkOptions: {
        headers: {},
      },
      fileProviderAuthority: 'com.testmobile.provider',
      needUpdateApp: performUpdate => {
        Alert.alert(
          'Update Available',
          'New version released, do you want to update? ',
          [
            {
              text: 'Cancel',
              onPress: () => {},
            },
            {text: 'Update', onPress: () => performUpdate(true)},
          ],
        );
      },
      forceUpdateApp: () => {
        console.log('forceUpdateApp callback called');
      },

      notNeedUpdateApp: () => {
        // console.log('notNeedUpdateApp callback called');
        this.showToast('Already updated');
      },

      downloadApkStart: () => {
        console.log('downloadApkStart callback called');
      },

      downloadApkProgress: progress => {
        // console.log(`downloadApkProgress callback called - ${progress}%...`);
        this.setState({downloadProgress: progress});
      },

      downloadApkEnd: () => {
        console.log('downloadApkEnd callback called');
        this.setState({downloadProgress: -1});
      },

      onError: err => {
        console.log('onError callback called', err);
        Alert.alert('There was an error', err.message);
        this.setState({downloadProgress: -1});
      },
    });
  }

  showToast = text => ToastAndroid.show(text, ToastAndroid.LONG);

  timeAndDate = obj => {
    return (
      ' ' +
      new Date(obj).toLocaleDateString() +
      ' at ' +
      new Date(obj).toLocaleTimeString()
    );
  };

  _onCheckServerVersion = () => {
    console.log('checking for update');
    // eslint-disable-next-line no-undef
    updater.checkUpdate();
  };

  render() {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.subCardContainer}>
          <Text style={styles.title}>testMobile app</Text>
          <Text style={styles.instructions}>
            Package Name:
            <Text style={styles.instructionsBold}>
              {' ' + UpdateAPK.getInstalledPackageName()}
            </Text>
          </Text>
          <Text style={styles.instructions}>
            Version Code:
            <Text style={styles.instructionsBold}>
              {' ' + UpdateAPK.getInstalledVersionCode()}
            </Text>
          </Text>
          <Text style={styles.instructions}>
            Version Name:
            <Text style={styles.instructionsBold}>
              {' ' + UpdateAPK.getInstalledVersionName()}
            </Text>
          </Text>
          <Text style={styles.instructions}>
            Installed:
            <Text style={styles.instructionsBold}>
              {this.timeAndDate(+UpdateAPK.getInstalledFirstInstallTime())}
            </Text>
          </Text>
          <Text style={styles.instructions}>
            Updated:
            <Text style={styles.instructionsBold}>
              {this.timeAndDate(+UpdateAPK.getInstalledLastUpdateTime())}
            </Text>
          </Text>
        </View>
        {this.state?.downloadProgress !== -1 && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginVertical: 40,
            }}>
            <Text style={styles.instructions}>
              Download Progress: {this.state?.downloadProgress}%
            </Text>
            <Progress.Bar
              progress={this.state.downloadProgress / 100}
              unfilledColor={Colors.white}
              height={40}
              width={Dimensions.get('window').width * 0.8}
              borderRadius={30}
              color={Colors.primary}
            />
          </View>
        )}
        {/*<CustomButton
          text="Check For Update"
          onPress={() => {
            this.setState({downloadProgress: 0});
            setInterval(() => {
              if (this.state.downloadProgress < 100) {
                this.setState({
                  downloadProgress: this.state.downloadProgress + 10,
                });
              } else {
                clearInterval(this.interval);
              }
            }, 1);
          }}
        />*/}

        <CustomButton
          text="Check For Update"
          onPress={this._onCheckServerVersion}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    minHeight: 50,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    margin: 10,
    borderColor: Colors.borders,
    backgroundColor: Colors.background,
  },
  subCardContainer: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    marginBottom: 8,
    fontStyle: 'italic',
    borderBottomWidth: 1,
    color: Colors.text,
    borderColor: Colors.borders,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'left',
    color: Colors.text,
    marginBottom: 5,
  },
  instructionsBold: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    color: Colors.text,
    marginBottom: 5,
  },
  progressBar: {
    backgroundColor: Colors.background,
  },
});
