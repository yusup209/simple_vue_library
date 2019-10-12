import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Category from '@/components/category/Category'
import Bookshelf from '@/components/bookshelf/Bookshelf'
import Guestbook from '@/components/guestbook/Guestbook'
import Books from '@/components/books/Books'
import Transaction from '@/components/transaction/Transaction'

Vue.use(Router)

const router =  new Router({
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
        },
        {
            path: "/category",
            name: "Category",
            component: Category,
        },
        {
            path: "/bookshelf",
            name: "Bookshelf",
            component: Bookshelf,
        },
        {
            path: "/guestbook",
            name: "Guestbook",
            component: Guestbook,
        },
        {
            path: "/books",
            name: "Books",
            component: Books,
        },
        {
            path: "/transaction",
            name: "Transaction",
            component: Transaction,
        }
    ]
})

router.beforeResolve((to, from, next) => {
    if (to.name){
        NProgress.start()
    }

    next()
})

router.afterEach((to, from) => {
    NProgress.done()
})

export default router