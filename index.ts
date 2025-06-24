import dotenv from "dotenv"
dotenv.config()
import app from './src/app'
import DatabaseConnect from "./config/db.config"

DatabaseConnect()
const port = process.env.PORT || 3070

app.listen(port, () => {
    console.log(`server listening at port:${port}`)
})
