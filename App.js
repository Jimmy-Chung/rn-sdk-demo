/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import type {Node} from 'react';

import MopSDK from 'react-native-mopsdk';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Button,
  Platform,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import ScanScreen from './scanner.js';

const openApplet = () => {
  console.log('openApplet call');
  MopSDK.openApplet({appId: '60964a900f0ca30001292da1'});
};

const getCurrentApplet = () => {
  console.log('getCurrentApplet call');
  MopSDK.currentApplet().then(res => {
    console.log('currentApplet', res);
  });
};

const closeApplet = () => {
  console.log('closeApplet call');
  MopSDK.closeApplet('5ea0412663cb900001d73867', true);
};

const closeAllApplets = () => {
  console.log('closeAllApplets call');
  MopSDK.closeAllApplets();
};

const qrcodeOpenApplet = qrcode => {
  console.log('🚀 ~ file: App.js ~ line 72 ~ qrcodeOpenApp ~ qrcode', qrcode);

  console.log('qrcodeOpenApplet call');
  MopSDK.qrcodeOpenApplet();
};

const clearApplets = () => {
  console.log('clearApplets call');
  MopSDK.clearApplets();
};

const registerAppletHandler = () => {
  console.log('registerAppletHandler call');
  const handler = {
    forwardApplet(params) {
      console.log(
        '🚀 ~ file: App.js ~ line 109 ~ forwardApplet ~ params',
        params,
      );
      console.log('forwardApplet call');
    },
    getUserInfo(params) {
      console.log(
        '🚀 ~ file: App.js ~ line 116 ~ getUserInfo ~ params',
        params,
      );
      console.log('getUserInfo call');
    },
    getCustomMenus(params) {
      console.log(
        '🚀 ~ file: App.js ~ line 123 ~ getCustomMenus ~ params',
        params,
      );
      let list = [
        {
          menuId: 'menuid1',
          image: 'image',
          title: 'title',
          type: 'type',
          foo: 'foo',
        },
        {
          menuId: 'menuid2',
          image: 'image',
          title: 'title',
          type: 'type',
          foo: 'foo',
        },
        {
          menuId: 'menuid2',
          image: 'image',
          title: 'title',
          type: 'type',
          foo: 'foo',
        },
        {
          menuId: 'menuid4',
          image: 'image',
          title: 'title',
          type: 'type',
          foo: 'foo',
        },
      ];
      console.log('getCustomMenus call');
      return list;
    },
    onCustomMenuClick(params) {
      console.log(
        '🚀 ~ file: App.js ~ line 130 ~ onCustomMenuClick ~ params',
        params,
      );
      console.log('onCustomMenuClick call');
    },
    appletDidOpen(params) {
      console.log(
        '🚀 ~ file: App.js ~ line 137 ~ appletDidOpen ~ params',
        params,
      );
      console.log('appletDidOpen call');
    },
  };
  MopSDK.registerAppletHandler(handler);
};

const addWebExtentionApi = () => {
  console.log('addWebExtentionApi call');
  const getWebUserProfile = params => {
    console.log('webview 自定义api getWebUserProfile call', params);
    params.getWebUserProfileCalled = true;
    return {webUserProfile: params};
  };
  MopSDK.addWebExtentionApi('getWebUserProfile', getWebUserProfile);
};

const registerExtensionApi = () => {
  console.log('registerExtensionApi call');
  const rnCustomAPI = params => {
    console.log('自定义 api rn CustomAPI call', params);
  };
  MopSDK.registerExtensionApi('rnCustomAPI', rnCustomAPI);
};

const callJS = () => {
  console.log('callJS call');
  MopSDK.callJS('5ea0412663cb900001d73867', 'app2jsFunction', '', {
    foo: 'test',
  });
};

const sendCustomEvent = () => {
  console.log('sendCustomEvent call');
  MopSDK.sendCustomEvent('5ea0412663cb900001d73867', {
    evenatName: 'hello-world',
    foo: 'test',
  });
};

const finishRunningApplet = () => {
  console.log('finishRunningApplet call');
  MopSDK.finishRunningApplet('5ea0412663cb900001d73867', true);
};

const setActivityTransitionAnim = () => {
  if (Platform.OS !== 'android') {
    console.log('仅安卓支持');
    return;
  }
  console.log('setActivityTransitionAnim call');
  // todo: anim 的值？
  MopSDK.setActivityTransitionAnim();
};
const App: () => Node = () => {
  const [isShowScaner, setIsShowScaner] = useState(false);
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.FINMopSDK);
    MopSDK.initialize({
      appkey:
        'Ev7QHvml1UcW98Y1GaLfR6Wco+BmbXHGW0J8XjJDwmq4Rs8e3Ake7IG3pIVL1D80',
      secret: 'a457dbedc6ccf258',
      apiServer: 'https://finchat-mop-b.finogeeks.club',
      apiPrefix: '/api/v1/mop',
      nativeEventEmitter: eventEmitter,
    })
      .then(res => {
        console.log('🚀 ~ file: App.js ~ line 412 ~ res', res);
      })
      .catch(error => {
        console.log('🚀 ~ file: App.js ~ line 49 ~ error', error);
      });
  });
  const [qrcode, setQrcode] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  const handleSetIsShowScaner = status => {
    setIsShowScaner(status);
  };

  const handleQRCodeResult = str => {
    setQrcode(str);
    qrcodeOpenApplet(str);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <ScanScreen
          isShowScaner={isShowScaner}
          handler={handleSetIsShowScaner}
          getQRCodeResult={handleQRCodeResult}
        />
        <Text style={styles.mainTitle}> React Native SDK Demo</Text>
        <Text style={styles.subTitle}>打开小程序</Text>
        <Button title="打开小程序" onPress={openApplet} />
        <Button title="查看小程序当前信息" onPress={getCurrentApplet} />
        <Button
          title="扫码打开小程序"
          onPress={() => {
            setIsShowScaner(!isShowScaner);
          }}
        />
        <Text style={styles.subTitle}>关闭/结束</Text>
        <Button title="关闭小程序" onPress={closeApplet} />
        <Button title="关闭所有小程序" onPress={closeAllApplets} />
        <Button title="清除缓存小程序" onPress={clearApplets} />
        <Button title="结束小程序" onPress={finishRunningApplet} />
        <Text style={styles.subTitle}>注册 API</Text>
        <Button title="注册小程序事件处理" onPress={registerAppletHandler} />
        <Button title="注册小程序扩展 api" onPress={registerExtensionApi} />
        <Button title="注册 webview 扩展 api" onPress={addWebExtentionApi} />
        <Text style={styles.subTitle}>其他</Text>
        <Button title="原生调用 webview 中的 js 方法" onPress={callJS} />
        <Button title="原生发送事件给小程序" onPress={sendCustomEvent} />
        <Button
          title="设置小程序切换动画（仅安卓）"
          onPress={setActivityTransitionAnim}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 60,
  },
  subTitle: {
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
