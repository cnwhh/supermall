import {
  request
} from './request'

export function getCategory() {
  return request({
    url: '/category'
  })
}


// 右侧图文等数据
export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  }).catch(err => err)
}


// // 右侧下方三个分类数据
// export function getSubCategoryDetail(miniWallkey, type) {
//   return request({
//     url: '/subcategory/detail',
//     params: {
//       miniWallkey,
//       type
//     }
//   }).catch(err => err)
// }

// //点击左侧导航栏从子组件中获取相关数据并保存在data中
export function activeIndex(data) {
  this.currentIndex = data.index;
  this.maitKey = data.maitKey;
  this.miniWallkey = data.miniWallkey

  this.getSubcategory(data.maitKey)
  this.getSubCategoryDetail(data.miniWallkey, this.currentType)
}
