import { useState } from 'react';

export default function useCustomAlert() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'info',
    primaryButtonText: 'OK',
    secondaryButtonText: null,
    onPrimaryPress: null,
    onSecondaryPress: null,
  });

  const showAlert = (config) => {
    setAlertConfig({
      title: config.title || '',
      message: config.message || '',
      type: config.type || 'info',
      primaryButtonText: config.primaryButtonText || 'OK',
      secondaryButtonText: config.secondaryButtonText || null,
      onPrimaryPress: config.onPrimaryPress || (() => hideAlert()),
      onSecondaryPress: config.onSecondaryPress || (() => hideAlert()),
    });
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  return {
    alertVisible,
    alertConfig,
    showAlert,
    hideAlert,
  };
}