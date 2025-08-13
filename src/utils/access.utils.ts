export const isPrivileged = (role: Role) =>
  role === Role.ADMIN || role === Role.HEADTEACHER;

