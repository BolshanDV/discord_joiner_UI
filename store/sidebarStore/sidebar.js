export const state = () => ({
    pages: [
        {
            title: 'Discord Joiner',
            url: '/',
            exact: true,
            icon: 'discordJoiner.svg'
        },
        {
            title: 'Message Bumper',
            url: '/messageBumper',
            icon: 'messageBumper.svg'
        },

    ]
})

export const getters = {
    getPages: state => state.pages
}
