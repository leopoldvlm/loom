import { ThreadsAPI } from "threads-api"


const globalForClient = globalThis as unknown as {

  client: ThreadsAPI | undefined

}


export const client = globalForClient.client ?? new ThreadsAPI()


if (process.env.NODE_ENV !== 'production') globalForClient.client = client