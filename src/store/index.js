import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            user:null,
            project:[],
            tasks: [],

        }
    }
});

export default store