<template>
    <div class="content">
        <h1>Formulário de Produtos</h1>
        <div class="contentFields">
            <aInput label="Informe a Descrição do Produto" wid="3" v-model="form.description" placeholder="Informe a Descrição do Produto" />
            <aSelect name="Type" idSelect="types" :options="types" label="Tipo do Produto" placeholder="Selecione....." v-model="form.type"/>
            <aInput label="Informe o Preço" wid="3" v-model="form.product_value" required/>
            <aInput label="Informe a data de validade" wid="3" v-model="form.expiration_date" type="date" />
        </div>
        <div class="actions">
            <aButton @click="save(false)" text="Salvar" save />
            <aButton @click="save(true)" text="Salvar e Permanecer" save />
            <aButton @click="returnList" text="Retornar a Listagem" to="/products/list" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductsForm',

    data() {
        return {
            form: {},
            button: {},
            types: [], 
        };
    },

    async created() {
        this.reloadTypes();
    },

    methods: {
        async reload(id) {
            try {
                const response = await this.$api.getData(`products/${id}`);
                this.form = response;
            } catch (error) {
                console.error('Erro ao carregar o produto:', error);
            }
        },

        async save(stay) {
            try {
                if (!this.form.id) {
                    await this.$api.postData('products/create', this.form).then(r => {
                        this.form.id = r.id;
                    });
                    
                } else {
                    await this.$api.putData(`products/${this.form.id}`, this.form);
                }

                if (!stay) 
                    this.returnList();
                    

            } catch (error) {
                console.error('Erro ao salvar o produto:', error);
            }
        },

        returnList() {
            this.$router.push({ name: 'productsList' });
        },




        // Carregamento de Const
        async reloadTypes() {
            try {
                this.types = await this.$api.getData('products/types');
            } catch (error) {
                console.error('Erro ao carregar os tipos:', error);
            }
        }
    }
}
</script>
