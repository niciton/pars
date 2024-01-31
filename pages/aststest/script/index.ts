import * as myVue from "vue";
type TUserBase = {
  id: number;
  login: string;
};

type TAdminUser = TUserBase & {
  type: "admin";
  accessLevel: number;
};

type TManagerUser = TUserBase & {
  type: "manager";
  accessLevel: number;
  roles: string[];
};

type TClientUser = TUserBase & {
  type: "client";
};

type TUser = TAdminUser | TManagerUser | TClientUser;

type dd = Extract<TUser, Record<"type", "manager">>;

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

const uId = users.map((u) => u.id);

function makeFilter<T extends TUser['type']>(uType: T) {
  return (user: TUser): user is Extract<TUser, { type: T }> => user.type === uType;
}

// function myFilter<U,T>(u: TUser, t: string): Extract<U, {type: T}>{
function myFilter<T extends TUser["type"]>(t: T) {
  return (user: TUser): user is Extract<TUser, { type: T }> => user.type === t;
}

const a: 'test' = "test";

const managerFilter = myFilter("admin");

const manager = users.filter(managerFilter).map((u) => u.login);

// console.log(myVue);

// =================== \\//

// const uManager = users.filter(({ type }) => type === "manager").map((u) => u.roles);
// const uManager = users.filter(isManager).map((u) => u.roles);

// function isManager<UserType>(user: TUser): user is TManagerUser {
//   return user.type === "manager";
// }

// function makeFilter<T extends TUser['type']>(uType: T) {
//   return (user: TUser): user is Extract<TUser, { type: T }> => user.type === uType;
// }

// const isManager2 = makeFilter("manager");
// const isAdmin = makeFilter("admin");
// const isClient = makeFilter("client");

// const uManager = users.filter(isManager2).map((u) => u.roles);
