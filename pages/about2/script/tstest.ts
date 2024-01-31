// export class Pagination {
//   private pageIndex: number | Ref = 1;
//   private lastPage: number | Ref = 12;
//   private amount = 7;
  
//   constructor(pageIndex: number, lastPage: number) {
//     this.setPageIndex(pageIndex);
//     this.setLastPage(lastPage);
//   }

//   isActivePage(index: number): boolean {
//     // console.log("isActivePage", unref(this.pageIndex));
//     return unref(this.pageIndex) === index;
//   }
//   getPageIndex(): number {
//     return unref(this.pageIndex);
//   }
//   setPageIndex(newPageIndex: number) {
//     if (isRef(this.lastPage)) {
//       this.pageIndex.value = newPageIndex;
//     } else {
//       this.pageIndex = ref(newPageIndex);
//     }
//   }
//   getLastPage(): number {
//     return unref(this.lastPage);
//   }
//   setLastPage(newLastPage: number) {
//     if (isRef(this.lastPage)) {
//       this.lastPage.value = newLastPage;
//     } else {
//       this.lastPage = ref(newLastPage);
//     }
//   }
//   getAmount(): number {
//     return this.amount;
//   }
//   getClass(name: string = "default"): string {
//     // const defaultClass = "pagination__item";
//     name = name;
//     const classes: {[key: string]: string} = {
//       prev: `pagination__prev`,
//       dotted: `pagination__dotted`,
//       next: `pagination__next`,
//       default: "pagination__item",
//     };
//     // const fullClass = ;
//     return `${classes.default} ${classes[name] ?? ""}`;
//   }
//   getHTML(name: string | number): string | number {
//     const html: {[key: string]: string} = {
//       prev: `<`,
//       dotted: `...`,
//       next: `>`,
//     };
//     if (name in html) { 
//       return html[name]
//     } else if (Number.isNaN(+name)) {
//       return name;
//     } else {
//       const pageIndex = unref(this.pageIndex)
//       const lastPage = unref(this.lastPage)
//       let num: number = 1;
//       if (pageIndex > 4) {
//         num = pageIndex-4;
//       } 
//       if (pageIndex + 5 > lastPage) {
//         num = -(lastPage - pageIndex);
//       } 
//       console.log();
//       if (pageIndex > lastPage - 5) {
//         num = lastPage - this.amount - 1;
//       }
//       return Number(name) + num;
//     }
//   }
//   onClick(event: Event) {
//     const link: HTMLElement | null = (event.target as HTMLElement)?.closest("[data-page]");
//     if (!link) return;
//     const { page } = link.dataset;
//     !Number.isNaN(Number(page)) && this.setPageIndex(Number(page));
//   }
//   isShow(name: string): boolean {
//     const pageIndex: number = unref(this.pageIndex),
//       lastPage: number = unref(this.lastPage);
//     const values: {[key: string]: Function} = {
//       prev: () => pageIndex > 1,
//       dotted1: () => pageIndex >= 6,
//       dotted2: () => pageIndex <= lastPage - 5,
//       next: () => lastPage > pageIndex,
//     };
//     if (name in values) return values[name]();
//     return true;
//   }
// }
export type TUserBase = {
  id: number;
  login: string;
};

export type TAdminUser = TUserBase & {
  type: "admin";
  accessLevel: number;
};

export type TManagerUser = TUserBase & {
  type: "manager";
  accessLevel: number;
  roles: string[];
};

export type TClientUser = TUserBase & {
  type: "client";
};

export type TUser = TAdminUser | TManagerUser | TClientUser;

function loadUsers(): TUser[] {
  return [
    { type: "admin", id: 1, login: "admin", accessLevel: 5 },
    { type: "client", id: 2, login: "cl1" },
    { type: "client", id: 3, login: "cl2" },
    { type: "manager", id: 4, login: "cl2", accessLevel: 1, roles: ["editor"] },
    { type: "manager", id: 5, login: "cl2", accessLevel: 2, roles: ["editor", "moderator"] },
  ];
}

const users = loadUsers();

const uId = users.map(u => u.id);

const uManager = users.filter(({ type }) => type === "manager").map((u) => u.roles);
