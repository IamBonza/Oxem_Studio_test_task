<template>
  <div class="wrapper">
    <div class="home">
      <h1 class="form-header">Рассчитайте стоимость автомобиля в лизинг</h1>
      <form action="" class="form" @submit.prevent>
        <div class="inputs-section">
          <CustomInput 
            :inputData="getInputData.carCost"
            :value="carCost"
            :isLoading="isLoading"
            @onChange="setCarCost"
          />
          <CustomInput 
            :inputData="getInputData.initialFee"
            :value="initialFee"
            :carCost="carCost"
            :isLoading="isLoading"
            @onChange="setInitialFee"
          />
          <CustomInput 
            :inputData="getInputData.leasTerm"
            :value="leasTerm"
            :isLoading="isLoading"
            @onChange="setLeasTerm"
          />
        </div>
        <div class="total-section">
          <TotalBlock
            title='Сумма договора лизинга'
            :value="summa"
          />
          <TotalBlock
            title='Ежемесячный платеж от'
            :value="monthPay"
          />
          <button type="submit" @click="sendForm" class="btn" :disabled="isLoading">

           <template v-if="!isLoading">
            Оставить заявку
           </template>
           
            <loadingIcon v-else />

          </button>
        </div>
        
      </form>
  </div>
  </div>
  
</template>

<script>
// @ is an alias to /src
import loadingIcon from '@/components/loadingIcon.vue'
import CustomInput from '@/components/customInput.vue';
import TotalBlock from '@/components/totalBlock.vue';
import { mapGetters, mapState } from 'vuex';
import axios from 'axios'

export default {
  name: 'HomeView',
  components: {
    CustomInput,
    TotalBlock,
    loadingIcon
},
  data() {
    return {
      carCost: 1000000,
      initialFee: 10,
      leasTerm: 1,
      isLoading: false
    }
  },
  computed: {
    ...mapState(['InputData']),
      ...mapGetters([
        'getInputData',
      ]),
    summa(){
      return Math.ceil((this.initialFee / 100 * this.carCost) + this.leasTerm * this.monthPay)
    },
    monthPay() {
      return Math.ceil((this.carCost - this.initialFee) * ((0.035 * Math.pow((1 + 0.035), this.leasTerm)) / (Math.pow((1 + 0.035), this.leasTerm) - 1)));
    }  
  },
  mounted() {
    this.carCost = this.getInputData.carCost.initialValue
    this.initialFee = this.getInputData.initialFee.initialValue
    this.leasTerm = this.getInputData.leasTerm.initialValue
  },
  methods: {
    setCarCost(value) {
      this.carCost = value
    },
    setInitialFee(value) {
      this.initialFee = value
    },
    setLeasTerm(value) {
      this.leasTerm = value
    },
    async sendForm() {
      this.isLoading = true
      const result = await axios(
        {
          url: 'https://hookb.in/eK160jgYJ6UlaRPldJ1P',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            "car_coast": this.carCost,
            "initail_payment": Math.ceil(this.initialFee / 100 * this.carCost),
            "initail_payment_percent": this.initialFee,
            "lease_term": this.leasTerm,
            "total_sum": this.summa,
            "monthly_payment_from": this.monthPay
          }
          }

      )
      
      this.isLoading = false
      return result
    }
  }
  
  
}
</script>

<style scoped lang="scss">
  
  @import '../css/HomeView.scss'
  
</style>
