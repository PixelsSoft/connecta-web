// Toast notification utility
class ToastManager {
  constructor() {
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(message, type = 'info', duration = 3000) {
    this.listeners.forEach(listener => {
      listener({ message, type, duration, id: Date.now() });
    });
  }

  success(message, duration = 3000) {
    this.notify(message, 'success', duration);
  }

  error(message, duration = 4000) {
    this.notify(message, 'error', duration);
  }

  warning(message, duration = 3500) {
    this.notify(message, 'warning', duration);
  }

  info(message, duration = 3000) {
    this.notify(message, 'info', duration);
  }
}

export const toast = new ToastManager();
