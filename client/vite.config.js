import { defineConfig } from "vite"

export default defineConfig( {
    server: {
        port: 4000,
        proxy: {
            "/graphql": "http://localhost:4001"
        }
    }
} )
