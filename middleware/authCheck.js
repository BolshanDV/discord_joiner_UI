export default function ({store, redirect}) {
    if (store.getters['authStore/authorization/token'] === false) {
        redirect('/web-app-tools')
    }
}

