import Vue from 'vue';
import Vuex from 'vuex';
import axios from "@/plugins/axios";

Vue.use(Vuex);

const index = new Vuex.Store({
    state: {
        isLoggedIn: false,
        localUser: {}
    },
    mutations: {
        setLoggedIn(state, value) {
            state.isLoggedIn = value;
        },
        setLocalUser(state, newUser) {
            state.localUser = {...newUser}
        }
    }, actions: {
        async addUser(state, payload) {
            state.localUser.push(payload);
        },
        async login(state, payload) {
            const loginResponse = await axios.post('/auth', payload)
            this.commit('setLocalUser', loginResponse.data.user);
            this.commit('setLoggedIn', true);
            localStorage.setItem('access_token', loginResponse.data.access_token);
            return loginResponse;
        },
        async registration(state, payload) {
            return axios.post('/user', payload);
        },
        async fetchProfile() {
            const response = await axios.get('/profile')
                .catch(err => {
                    return err;
                });
            if (response && response.status === 200) {
                console.log('fetch profile responce: ', response);
                this.commit('setLocalUser', response.data);
            }
        },
        async logout() {

        }
    },
    getters: {
        getProfile(state) {
            return state.localUser;
        },
        getLoggedInStatus(state) {
            return state.isLoggedIn;
        }
    }
});

export default index;