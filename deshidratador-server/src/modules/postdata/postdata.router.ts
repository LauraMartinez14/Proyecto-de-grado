import {Router} from 'express';
import * as postdata from './postdata.controller';

const router = Router()
// define routes
router.post('/postdata',postdata.postSendDataWebSocketController)
router.post('/changePreset',postdata.reciveConfigDataController)

// export router
export default router;