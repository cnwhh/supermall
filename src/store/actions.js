import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // payload新添加的商品
      // 1、查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // for (let item of context.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // }

      // 2、判断oldProduct
      if (oldProduct) {
        // 数量加一
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前的商品数量加一')
      } else {
        // 数量为一，并且将此商品加入进去
        payload.count = 1
        // 不能直接改，要通过mutations		
        // context.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}
