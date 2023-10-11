//@flow
import {Component} from 'react';
import {AuthProvider} from 'utils/AuthContext';
import {Navigator} from 'navigation/Navigator';
import {Alert} from 'react-native';
import * as UpdateAPK from 'rn-update-apk';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      onDownloadProgress: -1,
      allApp: [],
      allNonSystemsApp: [],
      userName: '',
    };

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

    this._onCheckServerVersion();
  }

  _onCheckServerVersion = () => {
    console.log('checking for update');
    // eslint-disable-next-line no-undef
    updater.checkUpdate();
  };

  render() {
    return (
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    );
  }
}
