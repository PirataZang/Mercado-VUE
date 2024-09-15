<template>
    <div class="inputField" :style="divStyle">
        <label v-if="label" class="inputLabel">{{ label }}</label>
        <input :class="`inputValue ${search ? 'search' : ''}  ${required ? 'required' : ''}`" :type="type" :maxlength="maxLength" :value="modelValue" :placeholder="placeholder" @input="$emit('update:modelValue', $event.target.value)" :required="required"/>
        <span class="bar"></span>
    </div>
</template>

<script>
export default {
    name: 'aInput',
    props: {
        modelValue: [Number, String],
        type: {
            type: String,
            default: 'text'
        },
        mask: {
            type: [Object, String],
            default: '',
        },
        maxLength: {
            type: Number,
        },
        label: {
            type: String,
            default: ''
        },
        wid: {
            type: [Number, String], 
            default: 3
        },
        placeholder: {
            type: String,
            default: ''
        },
        search: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        },


    },

    computed: {
        computedWidth() {
            if (this.wid > 0 && this.wid < 13)
                return (this.wid * 8.3);
        },
        divStyle() {
            return {
                width: `${this.computedWidth}%`
            };
        }
    }
}
</script>