const middleware = {}

middleware['authCheck'] = require('../middleware/authCheck.js')
middleware['authCheck'] = middleware['authCheck'].default || middleware['authCheck']

export default middleware
