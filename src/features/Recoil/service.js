export const getProductList = () => {
  console.count('调用 getProductList 次数')
  return new Promise((resolve) => {
    setTimeout(()=>{
      resolve({
        data: {
          products: [
            {
              id: 'iphone',
              name: 'iphone 12',
              price: 8400
            },
            {
              id: 'huawei mate 40',
              name: 'huawei mate 40',
              price: 8600
            },
            {
              id: 'xiaomi 10',
              name: 'xiaomi 10',
              price: 5678
            }
          ]
        }
      })
    }, 3000)
  })
}