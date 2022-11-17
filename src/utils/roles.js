const Role = {
    /**
     * 超级管理员
     */
    SUPER_ADMIN: 'superAdmin',
    /**
     * 管理员
     */
    ADMIN: 'admin',
    /**
     * 用户
     */
    USER: 'user'
}


/**
 * 是否是用户（不是管理员）
 * @param roles 
 */
export function isUser(roles) {
    return roles.length === 0 || ![Role.SUPER_ADMIN, Role.ADMIN].some(item => roles.includes(item));
}

/**
 * 是否是超级管理员
 * @param roles 
 */
export function isSuperAdmin(roles) {
    return roles.includes(Role.SUPER_ADMIN);
}

/**
 * 是否是管理员
 * @param roles 
 */
export function isAdmin(roles) {
    return roles.includes(Role.ADMIN);
}