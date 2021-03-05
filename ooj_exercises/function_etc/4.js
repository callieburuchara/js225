function myBind(func, context) {
  return function(...args) {
    return func.apply(context, args);
  }
}
