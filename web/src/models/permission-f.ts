interface BasePermission {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

type PermissionMap<T extends string> = Record<T, BasePermission>;

const DefaultBasePermission: BasePermission = {
  create: false,
  read: false,
  update: false,
  delete: false,
};

export { type PermissionMap, type BasePermission, DefaultBasePermission };
