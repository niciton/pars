import tippy, {
  delegate,
  hideAll
} from "tippy.js";

import "@css/libs/tippy";

tippy.setDefaultProps({
  theme: "light",
  zIndex: 40,
});

export {
  tippy,
  delegate,
  hideAll,
};