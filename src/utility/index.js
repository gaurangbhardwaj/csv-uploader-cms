export const debounce = function (callback, delay) {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => callback.apply(context, args), delay);
  };
};
