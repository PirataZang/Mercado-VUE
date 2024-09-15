<template>
  <div class="selectField" :style="divStyle">
    <label v-if="label" class="selectLabel">{{ label }}</label>
    <select class="optionField" :name="name" :id="idSelect" :value="modelValue" @change="updateValue($event)" :disabled="disabled" :required="required">
      <option v-if="placeholder" value="" selected>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.description }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'aSelect',

  props: {
    modelValue: [Number, String], // Propriedade para o valor selecionado
    options: {
      type: Array, // Alterado de Object para Array, já que é uma lista de opções
      default: () => []
    },
    name: {
      type: String,
      default: ''
    },
    idSelect: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    wid: {
      type: [Number, String],
      default: 3
    },

    required: {
      type: Boolean,
      default: false,
    }
  },

  computed: {
    computedWidth() {
      if (this.wid > 0 && this.wid < 13)
        return this.wid * 8.3;
    },
    divStyle() {
      return {
        width: `${this.computedWidth}%`
      };
    }
  },

  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>