import axios from 'axios'

export default axios.create({
    baseURL: 'http://192.168.0.136:3000' //localhost:3000 not working. use ip addess           
});