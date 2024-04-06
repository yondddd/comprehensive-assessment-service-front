const roleMap = {
  ADMIN: "管理员",
  COUNSELLOR: "辅导员",
  STUDENT: "学生",
  DEFAULT_ROLE: "无角色"
}

export const getRoleNumber = (role: string): string => {
  return roleMap[role as keyof typeof roleMap] || ""
}
