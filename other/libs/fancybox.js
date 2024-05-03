import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";
import "@css/libs/fancybox/default.scss";
// import ru from "@fancyapps/ui/src/Fancybox/l10n/ru.js";

const fancyOptions = {
  infinite: true,
  hideScrollbar: true,
  click: false,
  id: "custom",
  on: {
    prepare: (instance) => {
      const isSingle = instance.items.length === 1;
      const wrapper = `<div class="fancybox__inner ${isSingle ? "is-single " : ""}">
        <div class="h-full"></div>
      </div>`;
      $(instance.$container)
        .find(".fancybox__toolbar, .fancybox__carousel, .fancybox__thumbs")
        .wrapAll(wrapper);
    },
    init(instance) {
      instance.items.forEach((slide) => {
        const src = slide?.$thumb?.dataset?.src;
        if (src) {
          slide.src = processImgSrc(src);
          slide.thumb = src;
        }
      });
    },
    click: (instance, event) => {
      const { classList } = event.target;
      if (classList.contains("carousel__button") || classList.contains("fancybox__backdrop")) {
        instance.close();
      }
    },
  },
  Toolbar: {
    display: ["counter", "download", "thumbs", "close"],
    items: {
      close: {
        html: `
          <svg class="cursor-pointer stroke-1 transition-all" width="32" height="32">
            <use xlink:href="/img/icons.svg?v=1#close"></use>
          </svg>
        `,
      },
      download: {
        class: "fancybox__button--download",
        type: "link",
        click(event) {
          event.stopPropagation();
        },
        html: `
          <svg class="cursor-pointer stroke-1 transition-all" width="32" height="32">
            <use xlink:href="/img/icons.svg?v=1#download"></use>
          </svg>
        `,
      },
    },
  },
  Image: {
    click: false,
  },

  Carousel: {
    Navigation: {
      prevTpl: `
        <svg class="shrink-0 cursor-pointer rotate-180 stroke-1 transition-all" width="24" height="24">
          <use xlink:href="/img/icons.svg?v=1#arrow"></use>
        </svg>
      `,
      nextTpl: `
        <svg class="shrink-0 cursor-pointer stroke-1 transition-all" width="24" height="24">
          <use xlink:href="/img/icons.svg?v=1#arrow"></use>
        </svg>
      `,
    },
  },
  Thumbs: {
    type: "classic",
    tpl: `<div class="fancybox__thumb-wrapper"><div class="fancybox__thumb" style="background-image:url('{{src}}')"></div></div>`,
  },
};

const processImgSrc = (link) => {
  const path = link.split("/"),
    fileName = path.slice(-1)[0];

  if (path.includes("abcp")) {
    return link;
  }

  return path.slice(0, -1).concat(`original_${fileName}`).join("/");
};

// Fancybox.defaults.l10n = ru;

export { Fancybox, fancyOptions };
