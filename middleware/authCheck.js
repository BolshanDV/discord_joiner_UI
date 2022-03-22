export default function ({store, redirect}) {
    console.log(store.getters['authStore/authorization/token'])
    if (store.getters['authStore/authorization/token'] === false) {
        redirect('/')
    }
}

