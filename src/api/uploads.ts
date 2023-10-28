import express, { Request } from 'express'
import multer from 'multer'
import path from 'path'
import { IUser } from '../mongoose/model'
import { ApiRoutesNames } from '../routes/routes'
import { User as userModel } from '../mongoose/schemas/index'
import { ApiUtils } from '../utils'

const route = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define o diretório onde os arquivos serão salvos
    cb(null, './uploads'); // Certifique-se de que a pasta "uploads" exista
  },
  filename: (req, file, cb) => {
    // Define o nome do arquivo (no exemplo, usa o nome original)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

route.post(ApiRoutesNames.uploads, upload.single('file'), (req: any, res: any) => {
  // O arquivo foi carregado com sucesso e os detalhes do arquivo estão em req.file
  const imagePath = `/uploads/${req?.file?.filename}`;
  res.json({ imagePath });
  res.send(req.body)

})

export { route as uploadsRoutes }

