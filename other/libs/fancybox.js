import { Fancybox } from "@fancyapps/ui";
// import type { OptionsType } from '@fancyapps/ui/types/Fancybox/options';
import "@fancyapps/ui/dist/fancybox.css";
import "@/other/style/libs/fancybox.scss";
// import ru from "@fancyapps/ui/src/Fancybox/l10n/ru.js";

const fancyOptions = {
  infinite: true,
  hideScrollbar: true,
  click: false,
  id: "custom",
  on: {
    prepare: (instance) =>
    {
      const isSingle = instance.items.length === 1;
      // $(instance.$container)
      //   .find(".fancybox__toolbar, .fancybox__carousel, .fancybox__thumbs")
      //   .wrapAll(wrapper);
      let wrapChild = [];
      console.log(instance.$container);
      const wrap = new DOMParser().parseFromString(
        `<div class="fancybox__inner ${isSingle ? "is-single " : ""}">
          <div class="h-full" style="height: 100%;"></div>
        </div>`, "text/html");
      instance.$container.appendChild(wrap.querySelector(".fancybox__inner"));
      const instanceInner = instance.$container.querySelector(".fancybox__inner .h-full");

      instance.$container.querySelectorAll(".fancybox__toolbar, .fancybox__carousel, .fancybox__thumbs").forEach((item) =>
      {
        // instanceInner.appendChild(item.cloneNode(true));
        // // const newOuter = parser.parseFromString

        // item.remove();
        // item.outerHTML = newOuter;
      });
    },
    init(instance)
    {
      instance.items.forEach((slide) =>
      {
        const src = slide?.$thumb?.dataset?.src;
        if (src)
        {
          slide.src = processImgSrc(src);
          slide.thumb = src;
        }
      });
    },
    click: (instance, event) =>
    {
      const { classList } = (event.target);
      if (classList.contains("carousel__button") || classList.contains("fancybox__backdrop"))
      {
        instance.close();
      }
    },
  },
  Toolbar: {
    display: ["counter", "thumbs", "close"],
    items: {
      close: {
        html: `
          X
        `,
      },
    },
  },
  Image: {
    click: false,
    zoom: true,
  },

  Carousel: {
    Navigation: {
      prevTpl: `
        <
      `,
      nextTpl: `
        >
      `,
    },
  },
  Thumbs: {
    type: "classic",
    tpl: `<div class="fancybox__thumb-wrapper"><div class="fancybox__thumb" style="background-image:url('{{src}}')"></div></div>`,
  },
};

const processImgSrc = (link) =>
{
  return link;
};

// Fancybox.defaults.l10n = ru;

export { Fancybox, fancyOptions };
