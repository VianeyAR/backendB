// http:localhost:4000/api/v1/messages

const {Router} = require('express') 
const { rootMessage, himessage, byeMessage } = require('../controllers/messages')

const router = Router()



router.get('/', rootMessage) //End point


router.get('/hi', himessage) //End point


router.get('/bye', byeMessage) //End point



module.exports = router