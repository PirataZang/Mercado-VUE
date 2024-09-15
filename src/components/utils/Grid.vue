<template>
    <div class="content">
        <table class="table">
            <!-- Carrega Descrição das Coluna -->
            <thead>
                <tr>
                    <th class="checkbox">
                        <!-- Checkbox para selecionar/desselecionar todas as linhas -->
                        <input type="checkbox" @change="toggleSelectAll" :checked="areAllSelected">
                    </th>
                    <th class="columns" v-for="(col, index) in columnsDescription" :key="index"> {{ col }}</th>
                </tr>
            </thead>

            <!-- Carrega informações do banco -->
            <tbody>
                <tr class="items" v-for="(item, index) in rowDescription" :key="index">
                    <td class="tableCheckbox">
                        <input type="checkbox" v-model="selectedRows" :value="item" @change="emitSelection">
                    </td>
                    <!-- Itera sobre as colunas e exibe o valor correspondente -->
                    <td class="inf" v-for="col in columnsName" :key="col"> {{ item[col] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import collect from 'collect.js';

export default {
    name: 'Grid',

    data: () => ({
        columnsName: [],
        columnsDescription: [],
        rowDescription: [],
        selectedRows: [], // Itens selecionados
    }),

    props: {
        row: {
            type: Array,
            default: () => []
        },
        columns: {
            type: Array,
            default: () => []
        }
    },

    mounted() {
        this.reload();
    },

    watch: {
        columns: {
            handler() {
                this.reload();
            },
            deep: true,
        },
        row: {
            handler() {
                this.reloadRows();
            },
            deep: true,
        }
    },

    computed: {
        areAllSelected() {
            return this.selectedRows.length === this.rowDescription.length && this.rowDescription.length > 0;
        }
    },

    methods: {
        async reload() {
            this.columnsDescription = await this.loadColunsDescription();
            this.columnsName = await this.loadColunsNames();
            this.reloadRows();
        },

        reloadRows() {
            this.rowDescription = this.loadingRow();
            this.selectedRows = []; // Limpa seleção quando as linhas são recarregadas
            this.emitSelection(); // Emite evento de seleção vazia após recarregar
        },

        // Retorna o Nome das colunas
        loadColunsNames() {
            let colunmNames = collect(this.columns).pluck('name');
            return colunmNames.all();
        },

        loadColunsDescription() {
            let colunms = collect(this.columns).pluck('text');
            return colunms.all();
        },

        loadingRow() {
            return collect(this.row).all();
        },

        toggleSelectAll(event) {
            if (event.target.checked) {
                this.selectedRows = [...this.rowDescription];
            } else {
                this.selectedRows = [];
            }
            this.emitSelection(); // Emite evento ao selecionar/desmarcar todos
        },

        emitSelection() {
            // Emite o evento com os itens selecionados
            this.$emit('selection-changed', this.selectedRows);
        },

    }
};
</script>

