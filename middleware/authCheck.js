export default function ({store, redirect}) {
    if (!store.getters['authStore/authorization.js/token']) {
        console.log(store.getters['authStore/authorization.js/token'])
        redirect('/')
    }
}

