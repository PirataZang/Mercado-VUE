<template>
  <div>
    <h1>Listagem de Produtos</h1>
    <div class="searchField">
      <aInput wid="12" placeholder="Realize a Busca por aqui..." search v-model="search" />
      <aButton class="searchButton" text="Buscar" @click="searchable(this.search)" />
    </div>
    <div class="operators">
      <aButton text="Cadastrar" @click="createProducts" />
      <aButton text="Editar" :disabled="selectedItems.length !== 1" @click="editProduct" />
      <aButton text="Excluir" :disabled="selectedItems.length === 0" @click="deleteProduct" />
    </div>
    <Grid :row="items" :columns="columns" @selection-changed="handleSelectionChange" />
  </div>

  <template slot="typeDesc">
      {{ 'puts' }}
  </template>
</template>

<script>
import collect from 'collect.js';

export default {
  data: () => ({
    items: [],
    selectedItems: [], // Armazena os itens selecionados do grid
    columns: [
      { name: 'id', text: 'ID' },
      { name: 'description', text: 'Descrição' },
      { name: 'product_value', text: 'Valor' },
      { name: 'typeDesc', text: 'Tipo' },
      { name: 'expiration_date', text: 'Validade', }
    ],
    search: '',
  }),

  mounted() {
    this.loadItems();
  },

  methods: {
    loadItems() {
      this.$api.getData('products').then(r => {
        this.items = r;
      });
    },

    createProducts() {
      return this.$router.push({ name: 'CreateproductsForm' })
    },

    editProduct() {
      let id = collect(this.selectedItems).pluck('id').first();
      this.$router.push({ name: 'EditProductsForm', params: { id: id } })
    },

    deleteProduct() {
      let id = collect(this.selectedItems).pluck('id').all();
      this.$swal.fire({
        icon: "error",
        title: "Deseja Excluir este Produto?",
        confirmButtonText: 'Excluir',
        confirmButtonColor: '#d33',
        showCancelButton: true,
      }).then(resp => {
        if (resp.isConfirmed) {
          id.forEach(item => {
            this.$api.deleteData(`products/${item}`);
          })
          location.reload();
        }
      })


    },

    handleSelectionChange(selectedItems) {
      this.selectedItems = selectedItems;
    },

    searchable(data) {
      if(!data)
        return this.loadItems()

      this.$api.postData('products/filter', { description: this.search }).then(r => {
        this.items = r
        console.log(r)
      });
    }

  }
};
</script>
