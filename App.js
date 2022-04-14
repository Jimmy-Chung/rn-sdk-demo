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

import ScanScreen from './scanner.js';

const openApplet = () => {
  MopSDK.openApplet({appId: '60964a900f0ca30001292da1'});
};

const getCurrentApplet = callback => {
  setTimeout(() => {
    console.log('getCurrentApplet call');
    MopSDK.currentApplet().then(res => {
      console.log('currentApplet', res);
      callback(JSON.stringify(res));
    });
  }, 10000);
};

const closeApplet = () => {
  setTimeout(() => {
    console.log('closeApplet call');
    MopSDK.closeApplet('60964a900f0ca30001292da1', true);
  }, 10000);
};

const closeAllApplets = () => {
  setTimeout(() => {
    console.log('closeAllApplets call');
    MopSDK.closeAllApplets();
  }, 10000);
};

const qrcodeOpenApplet = qrcode => {
  console.warn('当前扫码', qrcode);

  console.log('qrcodeOpenApplet call');
  MopSDK.qrcodeOpenApplet(qrcode);
};

const clearApplets = () => {
  console.log('clearApplets call');
  MopSDK.clearApplets();
};

const registerAppletHandler = () => {
  const handler = {
    forwardApplet(params) {
      console.log('forwardApplet call', params);
      return [];
    },
    getUserInfo(params) {
      console.log('getUserInfo call', params);
      return {
        errMsg: 'getUserInfo:ok',
        data: {
          name: 'jimmy',
        },
      };
    },
    getCustomMenus(params) {
      console.log('getCustomMenus ca;;');
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
      return list;
    },
    onCustomMenuClick(params) {
      console.log('onCustomMenuClick', params);
    },
    appletDidOpen(params) {
      console.log('appletDidOpen', params);
      return params;
    },
  };
  MopSDK.registerAppletHandler(handler);
};

const addWebExtentionApi = () => {
  console.log('addWebExtentionApi call');
  const rnWebCustomAPI = params => {
    console.warn('webview 自定义api rnWebCustomAPI call', params);
    return {
      errMsg: 'rnWebCustomAPI:ok',
      data: 'customAPI',
    };
  };
  MopSDK.addWebExtentionApi('rnWebCustomAPI', rnWebCustomAPI);
};

const registerExtensionApi = () => {
  console.log('registerExtensionApi call');
  const rnCustomAPI = params => {
    console.warn('自定义 api rn rnCustomAPI call', params);
    return {
      errMsg: 'rnCustomAPI:ok',
      data: 'webCustomAPI',
    };
  };
  MopSDK.registerExtensionApi('rnCustomAPI', rnCustomAPI);
};

const callJS = () => {
  if (Platform.OS !== 'android') {
    setTimeout(() => {
      console.warn('ios calljs 执行');
      MopSDK.callJS('60964a900f0ca30001292da1', 'app2jsFunction', {
        data: 100,
      })
        .then(res => {
          console.warn('calljs 调用成功', res);
        })
        .catch(res => {
          console.warn('calljs 调用失败', res);
        });
    }, 10000);
  } else {
    MopSDK.callJS('60964a900f0ca30001292da1', 'app2jsFunction', {
      data: 100,
    })
      .then(res => {
        console.warn('calljs 调用成功', res);
      })
      .catch(res => {
        console.warn('calljs 调用失败', res);
      });
  }
};

const sendCustomEvent = () => {
  if (Platform.OS !== 'android') {
    setTimeout(() => {
      console.warn('sendCustomEvent call');
      MopSDK.sendCustomEvent('60964a900f0ca30001292da1', {
        evenatName: 'hello-world',
        foo: 'test',
      });
    }, 10000);
  } else {
    console.warn('sendCustomEvent call');
    MopSDK.sendCustomEvent('60964a900f0ca30001292da1', {
      evenatName: 'hello-world',
      foo: 'test',
    });
  }
};

const finishRunningApplet = () => {
  console.warn('结束运行的小程序');
  MopSDK.finishRunningApplet('60964a900f0ca30001292da1', true);
};

const setActivityTransitionAnim = () => {
  if (Platform.OS !== 'android') {
    console.warn('仅安卓支持');
    return;
  }
  console.log('setActivityTransitionAnim call');
  MopSDK.setActivityTransitionAnim('SlideFromBottomToTopAnim');
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
      userId: '13286836062',
    })
      .then(res => {
        console.log('🚀 ~ file: App.js ~ line 412 ~ res', res);
      })
      .catch(error => {
        console.log('🚀 ~ file: App.js ~ line 49 ~ error', error);
      });
  });
  const [qrcode, setQrcode] = useState('');
  const [appInfo, setAppInfo] = useState('');
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
        <Button
          title="查看小程序当前信息"
          onPress={() => {
            getCurrentApplet(setAppInfo);
          }}
        />
        <Text style={styles.padding}>小程序当前信息为: {appInfo}</Text>
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
  padding: {
    padding: 20,
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
