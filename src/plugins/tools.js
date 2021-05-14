
export default ({ Vue }) => {
    Vue.prototype.scrollIt = (id, selectorToScroll, offset) => {
          var element = document.getElementById(id)

          var elementToScroll = selectorToScroll ? document.querySelector(selectorToScroll) : window
          elementToScroll.scrollTo({
              'behavior': 'smooth',
              'left': 0,
              'top': element.offsetTop - (offset || 25)
          });
      }
}
