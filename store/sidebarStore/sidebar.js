export const state = () => ({
    pages: [
        {
            title: 'Discord Joiner',
            url: '/web-tools/discord-joiner',
            exact: true,
            icon: 'discordJoiner.svg'
        },
        {
            title: 'Message Bumper',
            url: '/web-tools/message-bumper',
            icon: 'messageBumper.svg'
        },
        {
            title: 'Captcha Settings',
            url: '/web-tools/captcha-settings',
            icon: 'captcha.svg'
        },

    ]
})

export const getters = {
    getPages: state => state.pages
}
