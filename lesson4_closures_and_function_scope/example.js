function countdown(count) {
  (function(num) {
    for (let current = num; current >= 0; current -= 1) {
      console.log(current);
    }
    console.log('Done!');
  })(count);
}

countdown(7);
