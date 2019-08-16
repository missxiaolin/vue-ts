import HttpRequest from '@/utils/fetch'

class User extends HttpRequest {
    login() {
        let optiones = {
            url: "/index/index",
            method: "GET",
            params: {}
        }
        return this.request(optiones)
    }
}

export default User