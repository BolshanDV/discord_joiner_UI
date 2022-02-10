export const state = () => ({
    pages: [
        {
            title: 'Home page',
            url: '/',
            exact: true,
            icon: ''
        },
        {
            title: 'Discord massage bumper',
            url: '/massageBumper',
            icon: ''
        },
        {
            title: 'Reaction clicker',
            url: '/reactionClicker',
            icon: ''
        },
        {
            title: 'Setting',
            url: '/setting',
            icon: ''
        },

    ]
})

export const getters = {
    getPages: state => state.pages
}
