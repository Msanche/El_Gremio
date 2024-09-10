import { createStore } from 'vuex'

export default createStore({
  state: {
    //Valor para el texto a mostrar en modal de inicio/Registro exitoso
    Actividad: null,
  },
  getters: {
    LoginRegistro(state){
      return state.Actividad;
    }
  },
  mutations: {
    LoginRegistro(state,payload){
      state.Actividad = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
