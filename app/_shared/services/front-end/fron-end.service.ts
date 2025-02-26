

class FrontendService {

    private loading: boolean = false



    getLoading() {
        return this.loading
    }


    setLoading() {
        this.loading = true
    }


    resetLoading() {
        this.loading = false
    }

}


export const _frontEndService = new FrontendService();