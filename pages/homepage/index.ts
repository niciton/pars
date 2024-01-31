

abstract class Page {
  constructor() {}
}

export class Homepage extends Page {
  count = ref(1);
  obj = reactive({
    object: {
      nyX3: {}
    }
  });
  name: Ref = ref("");
  value: Ref = ref("");

  constructor() {
    super();
    // this.count = 1;
  }
  increment() {
    this.count.value = ++this.count.value;
  }
  decrement() {
    this.count.value = --this.count.value;
  }

  writeDown(e:Event) {
    // console.log(this.name, this.value);
    // console.log(e);
    this.obj.object.nyX3[this.name.value] = this.value.value
  }
}