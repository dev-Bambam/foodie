import multer from 'multer'
import path from 'node:path'

// configure multer for in-memory storage (essential for cloudinary direct upload)
const storage = multer.memoryStorage()

// configure multer upload middleware 
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limit file size to 5mb
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            return cb(null, true) // Accept file
        }
        cb(new Error('Only images (jpeg, jpg, png, gif, webp) are allowed'))
    }
})


