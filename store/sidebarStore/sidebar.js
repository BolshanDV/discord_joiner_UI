export const state = () => ({
    pages: [
        {
            title: 'Discord Joiner',
            url: '/discord-joiner',
            exact: true,
            icon: 'discordJoiner.svg'
        },
        {
            title: 'Message Bumper',
            url: '/message-bumper',
            icon: 'messageBumper.svg'
        },
        {
            title: 'Captcha Settings',
            url: '/captcha-settings',
            icon: 'captcha.svg'
        },

    ]
})

export const getters = {
    getPages: state => state.pages
}
