import AOS from "aos";

import "aos/dist/aos.css";

export default ({ app }) => {
  // eslint-disable-next-line new-cap
  app.AOS = new AOS.init({
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    once: true, // whether animation should happen only once - while scrolling down
  });
};
