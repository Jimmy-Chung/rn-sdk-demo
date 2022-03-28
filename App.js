/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';

import mopsdk from 'react-native-mopsdk';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Alert,
  Platform,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

mopsdk
  .initialize({
    sdkkey: '22LyZEib0gLTQdU3MUauASlb4KFRNRajt4RmY6UDSucA',
    secret: 'c5cc7a8c14a2b04a',
  })
  .then(res => {
    console.log('message: ', res);
  })
  .catch(error => {
    console.log('error: ', error);
  });

const openApplet = () => {
  console.log('openApplet call');
  mopsdk.openApplet({appId: '5ea0412663cb900001d73867'});
};

const getCurrentApplet = () => {
  console.log('getCurrentApplet call');
  mopsdk.currentApplet().then(res => {
    console.log('currentApplet', res);
  });
};

const closeApplet = () => {
  console.log('closeApplet call');
  mopsdk.closeApplet('5ea0412663cb900001d73867', true);
};

const closeAllApplets = () => {
  console.log('closeAllApplets call');
  mopsdk.closeAllApplets();
};

const qrcodeOpenApplet = () => {
  console.log('qrcodeOpenApplet call');
  mopsdk.qrcodeOpenApplet();
};

const clearApplets = () => {
  console.log('clearApplets call');
  mopsdk.clearApplets();
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
      console.log('getCustomMenus call');
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
  mopsdk.registerAppletHandler(handler);
};

const addWebExtentionApi = () => {
  console.log('addWebExtentionApi call');
  const getWebUserProfile = params => {
    console.log('webview 自定义api getWebUserProfile call', params);
    params.getWebUserProfileCalled = true;
    return {webUserProfile: params};
  };
  mopsdk.addWebExtentionApi('getWebUserProfile', getWebUserProfile);
};

const registerExtensionApi = () => {
  console.log('registerExtensionApi call');
  const getUserProfile = params => {
    console.log('自定义 api getUserProfile call', params);
    params.getUserProfileCalled = true;
    return {userProfile: params};
  };
  mopsdk.registerExtensionApi('getUserProfile', getUserProfile);
};

const callJS = () => {
  console.log('callJS call');
  // todo: nativeViewId 应该填啥
  mopsdk.callJS('5ea0412663cb900001d73867', 'app2jsFunction', '', {
    foo: 'test',
  });
};

const sendCustomEvent = () => {
  console.log('sendCustomEvent call');
  mopsdk.sendCustomEvent('5ea0412663cb900001d73867', {
    evenatName: 'hello-world',
    foo: 'test',
  });
};

const finishRunningApplet = () => {
  console.log('finishRunningApplet call');
  mopsdk.finishRunningApplet('5ea0412663cb900001d73867', true);
};

const setActivityTransitionAnim = () => {
  if (Platform.OS !== 'android') {
    console.log('仅安卓支持');
    return;
  }
  console.log('setActivityTransitionAnim call');
  // todo: anim 的值？
  mopsdk.setActivityTransitionAnim();
};
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <Text style={styles.mainTitle}> React Native SDK Demo</Text>
        <Text style={styles.subTitle}>打开小程序</Text>
        <Button title="打开小程序" onPress={openApplet} />
        <Button title="查看小程序当前信息" onPress={getCurrentApplet} />
        <Button title="扫码打开小程序" onPress={qrcodeOpenApplet} />
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
