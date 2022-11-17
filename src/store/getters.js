export default {
    token: state => state.user.token,
    user: state => state.user.user,
    routes: state => state.permission.routes,
    themes: state => state.app.themes,
    currentTheme: state => state.app.currentTheme,
    collapse: state => state.app.collapse,
    tagsView: state => state.tagsView.tagsView
}