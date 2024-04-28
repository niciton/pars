<template>
  <div
    :class="['modal', { open: appIsOpen }, ...(appProps.customClass || [])]"
    @click="toggleModal"
  >
    <button class="modal__close">
      <span>X</span>
    </button>
    <div class="modal__content container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
type TModalEmitEvent = { 
  isOpen: boolean 
}

type TProps = {
  customClass?: [];
  modalName: string;
  isOpen?: boolean;
};

export type { TModalEmitEvent };

const appEmit = defineEmits<{
  (e: "toggleOpen", isOpen: TModalEmitEvent): void;
}>();

let appProps = defineProps<TProps>();

let appIsOpen: boolean = appProps.isOpen || false;

function toggleModal(e: Event) {
  if (!(e.target as HTMLElement).closest(".modal__content")) {
    appIsOpen = false;

    appEmit("toggleOpen", {
      isOpen: false,
    });
  }
}

watch(
  () => appProps.isOpen,
  () => {
    appIsOpen = appProps.isOpen;
  }
);
</script>

<style lang="scss">
.modal {
  cursor: pointer;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  opacity: 0;
  pointer-events: none;
  display: flex;
  align-items: center;

  &.open {
    background: rgba(0, 0, 0, 0.5);
    opacity: 1;
    pointer-events: all;
  }

  &__content {
    cursor: auto;
    border-radius: 9px;
    overflow: hidden;
  }

  &__close {
    cursor: pointer;
    position: fixed;
    z-index: 99;
    right: 15px;
    top: 15px;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    outline: none;

    span {
      font-size: 20px;
      transform: scale(1.4, 1);
    }
  }
}
</style>