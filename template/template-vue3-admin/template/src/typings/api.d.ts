// 后端接口返回的数据类型

/** 后端返回的用户权益相关类型 */
declare namespace ApiAuth {
  /** 返回的token和刷新token */
  interface Token {
    token: string;
    refreshToken: string;
  }
  /** 返回的用户信息 */
  type UserInfo = Auth.UserInfo;
}

/** 后端返回的路由相关类型 */
declare namespace ApiRoute {
  /** 后端返回的路由数据类型 */
  interface Route {
    /** 动态路由 */
    routes: AuthRoute.Route[];
    /** 路由首页对应的key */
    home: AuthRoute.RouteKey;
  }
}

declare namespace ApiDemo {
  interface DataWithAdapter {
    dataId: string;
    dataName: string;
  }
}

declare namespace ApiUserManagement {
  interface UserTable {
    /** 用户id */
    id: string;
    /** 用户名 */
    name: string;
    /** 用户年龄 */
    age: number;
    /**
     * 用户性别
     * - 男 1
     * - 女 0
     */
    gender: '0' | '1' | null;
    /** 用户手机号码 */
    phone: string;
    /** 用户邮箱 */
    email: string;
    /** 用户角色 */
    role: Auth.RoleType;
    /** 是否禁用用户 */
    disabled: boolean;
  }
}
