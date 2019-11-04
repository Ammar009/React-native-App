package com.tiptap;

import android.app.Application;

import com.facebook.react.ReactApplication;
// import io.invertase.firebase.RNFirebasePackage;
// import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; // <-- Add this line
import com.RNFetchBlob.RNFetchBlobPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import fr.snapp.imagebase64.RNImgToBase64Package;
import com.imagepicker.ImagePickerPackage;
import com.henninghall.date_picker.DatePickerPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            // new RNFirebasePackage(),
            new RNFetchBlobPackage(),
            new RNCWebViewPackage(),
            new RNImgToBase64Package(),
            new ImagePickerPackage(),
            new DatePickerPackage(),
            new AsyncStoragePackage(),
            new VectorIconsPackage(),
            new SplashScreenReactPackage(),
            new RNGestureHandlerPackage()
            // new RNFirebaseMessagingPackage() // <-- Add this line
            // new SplashScreenReactPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
