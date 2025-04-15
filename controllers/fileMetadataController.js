let multer = require('multer')
let fsExtra = require('fs-extra');
let filesPath = './files'
//Define path for files
const upload = multer({ dest: filesPath })
/**
 * Upload a file and storage file 
 * @param {Object} request 
 * @param {Object} response 
 */
function fileAnalizer(request,response) {
    let size = request.file.size
    let name = request.file.originalname
    let type = request.file.mimetype
    // Remove files from files directory
    fsExtra.emptyDirSync(filesPath);
    response.json({
      size:size,
      name:name,
      type:type
    })
}

let uploadCallback = upload.single('upfile')

module.exports = {fileAnalizer,uploadCallback}