//@flow
import React, {Component} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import * as UpdateAPK from 'rn-update-apk';

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
        console.log('notNeedUpdateApp callback called');
      },

      downloadApkStart: () => {
        console.log('downloadApkStart callback called');
      },

      downloadApkProgress: progress => {
        console.log(`downloadApkProgress callback called - ${progress}%...`);
        this.setState({downloadProgress: progress});
      },

      downloadApkEnd: () => {
        console.log('downloadApkEnd callback called');
      },

      onError: err => {
        console.log('onError callback called', err);
        Alert.alert('There was an error', err.message);
      },
    });
  }

  async componentDidMount() {
    UpdateAPK.getApps()
      .then(apps => {
        console.log('Installed Apps: ', JSON.stringify(apps));
        this.setState({allApps: apps});
      })
      .catch(e => console.log('Unable to getApps?', e));

    UpdateAPK.getNonSystemApps()
      .then(apps => {
        console.log('Installed Non-System Apps: ', JSON.stringify(apps));
        this.setState({allNonSystemApps: apps});
      })
      .catch(e => console.log('Unable to getNonSystemApps?', e));
  }

  _onCheckServerVersion = () => {
    console.log('checking for update');
    // eslint-disable-next-line no-undef
    updater.checkUpdate();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcome}>rn-update-apk example</Text>
        <Text style={styles.instructions}>
          Installed Package Name: {UpdateAPK.getInstalledPackageName()}
        </Text>
        <Text style={styles.instructions}>
          Installed Version Code: {UpdateAPK.getInstalledVersionCode()}
        </Text>
        <Text style={styles.instructions}>
          Installed Version Name: {UpdateAPK.getInstalledVersionName()}
        </Text>
        <Text style={styles.instructions}>
          Installed First Install Time:
          {new Date(+UpdateAPK.getInstalledFirstInstallTime()).toUTCString()}
        </Text>
        <Text style={styles.instructions}>
          Installed Last Update Time:
          {new Date(+UpdateAPK.getInstalledLastUpdateTime()).toUTCString()}
        </Text>
        <Text style={styles.instructions}>
          Installed Package Installer:
          {UpdateAPK.getInstalledPackageInstaller()}
        </Text>
        <ScrollView style={{flex: 1}}>
          <Text style={styles.instructions}>
            Installed Apps: {JSON.stringify(this.state.allApps, null, '\t')}
          </Text>
          <Text style={styles.instructions}>
            Installed Non-System Apps:{' '}
            {JSON.stringify(this.state.allNonSystemApps, null, '\t')}
          </Text>
          <Text style={styles.instructions}>
            Installed Package Certificate SHA-256 Digest:
            {UpdateAPK.getInstalledSigningInfo()
              ? UpdateAPK.getInstalledSigningInfo()[0].thumbprint
              : ''}
          </Text>
          <Text style={styles.instructions}>
            {UpdateAPK.getInstalledSigningInfo()
              ? UpdateAPK.getInstalledSigningInfo()[0].toString
              : ''}
          </Text>
        </ScrollView>
        {this.state?.downloadProgress !== -1 && (
          <Text style={styles.instructions}>
            Download Progress: {this.state?.downloadProgress}%
          </Text>
        )}
        <Button
          title="Check Server For Update"
          onPress={this._onCheckServerVersion}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    fontSize: 12,
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
  },
});
