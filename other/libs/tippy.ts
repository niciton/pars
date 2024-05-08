import tippy, {
  delegate,
  hideAll
} from "tippy.js";

import "@/other/style/libs/tippy.scss";

tippy.setDefaultProps({
  theme: "light",
  zIndex: 40,
});

export {
  tippy,
  delegate,
  hideAll,
};