export const localStorageKeys = {
  bannerPageSize: 'banner-page-size',
  typeGroupPageSize: 'typeGroup-page-size',
  typePageSize: 'type-page-size',
  productPageSize: 'product-page-size'
}

export const homeUrl = '/' // 登录后跳转页面

/* 本地: 上传路径 */
export const ajaxPrefix = '/api' // ajax请求url前缀，测试环境下使用/api开头，前端做代理（url前缀匹配），生产环境为/ent
export const urlPrefix = 'http://localhost:8090/'
export const imgUrlPrefix = 'http://localhost:8090/static/images/'
export const imgUrlPrefix2 = 'http://localhost:8090/upload/file/'
export const uploadFilePath = 'http://localhost:8080/manage/common/upload'
export const downloadFilePath = 'http://localhost:8080/upload/file/'

/* 测试: 上传路径 */
// export const ajaxPrefix = '/' // ajax请求url前缀，测试环境下使用/api开头，前端做代理（url前缀匹配），生产环境为/ent
// export const urlPrefix = 'http://192.168.3.123:8090/'
// export const imgUrlPrefix = 'http://192.168.3.123:8090/static/images/'
// export const imgUrlPrefix2 = 'http://192.168.3.123:8090/upload/file/'
// export const uploadFilePath = 'http://192.168.3.123:8080/manage/common/upload'
// export const downloadFilePath = 'http://192.168.3.123:8080/upload/file/'

/* 正式: 上传路径 */
// export const ajaxPrefix = '/'// ajax请求url前缀，测试环境下使用/api开头，前端做代理（url前缀匹配），生产环境为/ent
// export const urlPrefix = 'http://120.79.173.122:8090/'
// export const imgUrlPrefix = 'http://120.79.173.122:8090/static/images/'
// export const imgUrlPrefix2 = 'http://120.79.173.122:8090/upload/file/'
// export const uploadFilePath = 'http://120.79.173.122:8080/manage/common/upload'
// export const downloadFilePath = 'http://120.79.173.122:8080/upload/file/'
