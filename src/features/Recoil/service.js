export const fetchFriends = () => {
  return new Promise((resolve) => {
    setTimeout(()=>{
      resolve({
        data: {
          friends: [
            {
              name: 'xiaoming',
              age: 11
            },
            {
              name: 'xiaohong',
              age: 12
            },
            {
              name: 'xiaodong',
              age: 10
            }
          ]
        }
      })
    })
  })
}