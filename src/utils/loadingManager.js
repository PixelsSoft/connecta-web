// Simple loading manager without Redux dependency
class LoadingManager {
  constructor() {
    this.requestCount = 0;
    this.listeners = [];
  }

  startLoading() {
    this.requestCount += 1;
    this.notifyListeners();
  }

  stopLoading() {
    this.requestCount = Math.max(0, this.requestCount - 1);
    this.notifyListeners();
  }

  isLoading() {
    return this.requestCount > 0;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.isLoading()));
  }
}

export const loadingManager = new LoadingManager();
