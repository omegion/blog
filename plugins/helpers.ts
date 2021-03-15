export default class Helpers {
  static delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
}
