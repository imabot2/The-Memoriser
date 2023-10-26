

/**
 * Easing function [ cubic-bezier(0.5, 1, 0.89, 1) ]
 * @param {float} x Absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * @returns 
 */
export function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}


/**
 * Increase a number from from to to during one second with the easeOutQuad function
 * @param {element} element The element to update
 * @param {float} from Initial value
 * @param {float} to Final value
 * @param {integer} digits Number of digits after the comma
 * @param {boolean} sign When true the sign is always displayed
 */
export function easeOutQuadProgress(element, from, to, digits = 0, sign = false) {

  // Count the iterations
  let counter = 0;
  let delta = to - from;
  // Start the timer
  let timer = setInterval(() => {
    counter++;
    if (counter >= 50) {
      // If the animation is over, set the final value and stop the timer

      if (sign && to > 0)
        element.innerText = `+${to.toFixed(digits)}`;
      else
        element.innerText = to.toFixed(digits);
      clearInterval(timer);
    }
    else {
      let newValue = from + delta * easeOutQuad(counter / 50);
      if (sign && newValue > 0)
        element.innerText = `+${newValue.toFixed(digits)}`;
      else
        element.innerText = newValue.toFixed(digits);
    }
  }, 20)
}


