import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      inputData: {
        carCost: {
          title: 'Стоимость автомобиля',
          startsFrom: 1000000,
          endsTo: 6000000,
          value: '₽',
          initialValue: 3300000
        },
        initialFee: {
          title: 'Первоначальный взнос',
          startsFrom: 10,
          endsTo: 60,
          value: '%',
          initialValue: 13
        },
        leasTerm: {
          title: 'Срок лизинга',
          startsFrom: 1,
          endsTo: 60,
          value: 'мес.',
          initialValue: 60
        }

      }
,
    totalBlockTitles: ['Сумма договора лизинга', 'Ежемесячный платеж от']
  },
  getters: {
    getInputData: (state) => {
      return state.inputData
    },
    getTotalBlockTitles: (state) => {
      return state.totalBlockTitles
    }

  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
