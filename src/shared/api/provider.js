import bridge from '@vkontakte/vk-bridge';

export class VKBridgeProvider {
  constructor() {
    this.bridge = bridge;
  }

  subscribe(method, callback, onSubscribe, onUnsubscribe) {
    const fn = (event) => {
      if (event?.detail?.data && event?.detail?.type.indexOf(method) === 0 && !event?.detail?.type.includes('Failed')) {
        callback(event.detail.data);
      }
    };

    this.bridge.subscribe(fn);
    if (onSubscribe) {
      onSubscribe();
    }

    return () => {
      this.bridge.unsubscribe(fn);

      if (onUnsubscribe) {
        onUnsubscribe();
      }
    };
  }
}
