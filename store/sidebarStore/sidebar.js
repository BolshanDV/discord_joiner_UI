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
            url: '/massageBumper',
            icon: 'messageBumper.svg'
        },
        {
            title: 'Settings',
            url: '/settings',
            icon: 'setting.svg'
        },

    ]
})

export const getters = {
    getPages: state => state.pages
}
