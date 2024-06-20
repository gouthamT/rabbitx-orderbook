export class Centrifuge {
  constructor(url, options) {
    this.url = url;
    this.options = options;
    this.connected = false;
  }

  newSubscription(type) {
    return {
      on: (
        event,
        callback,
      ) => {
        if (event === "publication") {
          callback({ data: { type } });
        }
      },
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
    };
  }

  connect() {
    this.connected = true;
  }

  disconnect() {
    this.connected = false;
  }

  on() {}
}
