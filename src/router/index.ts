import { createRouter, createWebHistory } from 'vue-router'
import ProductsList from '@/components/Products/ProductsList.vue'
import HomePage from '@/components/HomePage.vue'
import ProductsForm from '@/components/Products/ProductsForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },

    // Products
    {
      path: '/products',
      name: 'productsList',
      component: ProductsList
    },
    {
      path: '/products/open',
      name: 'CreateproductsForm',
      component: ProductsForm
    },
    {
      path: '/products/open=:id',
      name: 'EditProductsForm',
      component: ProductsForm
    }

  ]
})

export default router
