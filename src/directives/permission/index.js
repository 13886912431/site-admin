import store from '@/store';

function checkPermission(el, binding) {
    const { value } = binding;
    const roles = store.getters.user && store.getters.user.roles;

    if (value && value instanceof Array) {
        if (value.length > 0) {
            const permissionRoles = value;

            const hasPermission = permissionRoles.some(r => roles.includes(r));

            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    } else {
        throw new Error(`need roles! Like v-permission="['admin','user']"`);
    }
}

export default {
    mounted(el, binding) {
        checkPermission(el, binding);
    },
    updated(el, binding) {
        checkPermission(el, binding);
    }
};
