<template>
  <div class="custom-input">
    <h2 class="custom-input__title">{{inputData.title}}</h2>
    <number 
      v-bind="number"
      :class="inputClasses" 
      :min="min" 
      :max="max" 
      :value="inputValue"
      :disabled="isLoading"
      @input="onInputChange(inputData.value)"
      />
    <span v-if="perc" :class="percSignClasses">{{value}}%</span> 
    <span v-else :class="inputSignClasses">{{inputData.value}}</span>

    <b-field>
      <b-slider 
        rounded
        :min="inputData.startsFrom" 
        :max="inputData.endsTo"
        :tooltip="false" 
        :value="value"
        :disabled="isLoading"
        @dragging="onSliderChange"
        ></b-slider>
    </b-field>

  </div>
</template>

<script>
  import { number } from '@coders-tm/vue-number-format'
export default {

  name: 'customInput',
  components: {
      number,
    },
  props: {
    inputData: Object,
    value: Number,
    carCost: Number,
    isLoading: Boolean
  },
  data() {
    return {
      number: {
          decimal: '.',
          separator: ' ',
          prefix: '',
          precision: 2,
          masked: false,
        },
    }
  },
  computed: {
    perc(){
      if(!this.carCost) {
        return 0
      }
      return this.value / 100
    },
    inputValue() {
      if(this.perc) {
        return Math.ceil(this.carCost * this.perc)
      }
      return this.value
    },
    min(){
      if(this.perc) {
        return Math.ceil(this.inputValue.startFrom / 100 * this.carCost)
      }
      return this.inputValue.startsFrom
    },
    max(){
      if(this.perc) {
        return Math.ceil(this.inputValue.endsTo / 100 * this.carCost)
      }
      return this.inputValue.endsTo
    },
    inputClasses(){
      return {
        'custom-input__input': true,
        'custom-input__input_disabled': this.isLoading
      }
    },
    percSignClasses() {
      return {
        'custom-input__perc-sign': true,
        'custom-input__perc-sign_disabled': this.isLoading
      }
    },
    inputSignClasses() {
      return {
        'custom-input__sign': true,
        'custom-input__sign_disabled': this.isLoading
      }
    }
  },

  mounted() {
    
  },
  methods: {
    onSliderChange(value) {
      this.$emit('onChange', value)
    },
    onInputChange(value) {
      // if(this.perc) {
      //   console.log(value);
      // }
      console.log(value)
    }
  }
 }
</script>

<style scoped lang="scss">
  @import '../css/customInput.scss'
  
</style>
