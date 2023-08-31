import axios from 'axios'
const base_url = axios.create({ baseURL: "https://eco-api-one.vercel.app/api/" })

export default base_url