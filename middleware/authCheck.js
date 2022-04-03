export default function ({store, redirect}) {
    if (store.getters['web-app/authStore/authorization/token'] === false) {
        redirect('/web-tools')
    }
}

