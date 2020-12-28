import axios from 'axios'

export default axios.create({
    baseURL: 'http://192.168.137.1:3000' //localhost:3000 not working. use ip addess           
});