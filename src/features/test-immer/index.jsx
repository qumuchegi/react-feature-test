import React, {Component} from 'react';
import Com1 from './components/com1'
import Com2 from './components/com2'
import Com3 from './components/com3'
import produce from "immer"

export default class TestImmer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      p: {
        a: 0,
        b: 0,
        c: {
          d: 0
        }
      }
    }
    this.handleChange1 = this.handleChange1.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
  }
  componentDidUpdate() {
    console.log('父组件重新渲染了')
  }

  // 改变父组件状态的反面写法
  handleChange1() {
    /**
     * 第一种写法，这种会使每一步增 2，而不是 1 ，是错误的写法
     */
    // this.setState(({ p }) => {
    //   let a = p.a + 1
    //   p.a = a
    //   return {p}
    // })

    /**
     * 第二种，这种其实可以达到优化目的，不会让组件 3 重渲染，但是它是直接在 state 修改，不推荐
     */
    // let p = this.state.p // 实际上这个 p 会和 this.state.p 引用同一个 p
    // p.a = p.a+1 // 其实这里已经直接在 state 上修改 p 了
    // this.setState({p})

    /**
     * 第三种,会让组件 3 重渲染
     */
    this.setState(({ p }) => {
      let a = p.a + 1
      return {
        p: {
          a,
          b: p.b, // b 是基本类型
          c: { // 这里实际上 c 被赋予了新的对象，虽然值与原来一样，但是引用地址不同了
            d: 0
          }
      }}
    })
  }

  // 改变父组件状态的正确写法
  handleChange2() {
   /**
    * 第一种方法
    */
  //  this.setState(({ p }) => {
  //   let a = p.a + 1
  //   return {
  //     p: {
  //       ...p,
  //       a,
  //   }}
  //  })
    
    /**
     * 第二种方法，使用 immer.js
     */
    // let curP = this.state.p
    // let newP = produce(curP, draftP => {
    //   draftP.a = draftP.a + 1
    // })
    // this.setState({
    //   p: newP
    // })

    /**
     * 第二种的第二种写法，更加简洁
     */
    this.setState(produce(draftState => {
      draftState.p.a++
    }))
  }
  render() {
    return (
      <div>
        <div>
          父组件的状态：
          <pre>
            {`
            p: {
             a: 0,
             b: 0,
             c: {
               d: 0
             }
            }`}
          </pre>
          其中 p.a 和 p.b 、p.c分别通过 props 传给组件 1 和组件 2 、组件 3，现在尝试改变组件 1 接收到的 a，肯定会引起组件 1 重新渲染，那么 组件 2 、3 也会不会重新渲染呢？(组件 3 使用了 PureComponent, 组件 1 、2 用 Component)
          <div>
            以下用两种方法来改变 a：
            <div style={{
              backgroundColor: 'yellow',
              width: 800,
              margin: '20px auto'
            }}>
              <div>
                第一种：
                <pre>
                  {`
                   // 改变父组件状态的反面写法
                   handleChange1() {
                     /**
                      * 第一种写法，这种会使每一步增 2，而不是 1 ，是错误的写法
                      */
                     // this.setState(({ p }) => {
                     //   let a = p.a + 1
                     //   p.a = a
                     //   return {p}
                     // })
                 
                     /**
                      * 第二种，这种其实可以达到优化目的，不会让组件 3 重渲染，但是它是直接在 state 修改，不推荐
                      */
                     // let p = this.state.p // 实际上这个 p 会和 this.state.p 引用同一个 p
                     // p.a = p.a+1 // 其实这里已经直接在 state 上修改 p 了
                     // this.setState({p})
                 
                     /**
                      * 第三种
                      */
                     this.setState(({ p }) => {
                       let a = p.a + 1
                       return {
                         p: {
                           a,
                           b: p.b, // b 是基本类型
                           c: { // 这里实际上 c 被赋予了新的对象，虽然值与原来一样，但是引用地址不同了
                             d: 0
                           }
                       }}
                     })
                   }
                 `}
                </pre>
              </div>
              <div style={{
                backgroundColor: 'green',
                width: 800,
                margin: '20px auto'
            }}>
                第二种，引入不可变数据，使用 immer.js 库：
                <pre>
                  {`
                    // 改变父组件状态的正确写法
                    handleChange2() {
                     /**
                      * 第一种方法
                      */
                    //  this.setState(({ p }) => {
                    //   let a = p.a + 1
                    //   return {
                    //     p: {
                    //       ...p,
                    //       a
                    //   }}
                    //  })
                      
                      /**
                       * 第二种方法，使用 immer.js
                       */
                      // let curP = this.state.p
                      // let newP = produce(curP, draftP => {
                      //   draftP.a = draftP.a + 1
                      // })
                      // this.setState({
                      //   p: newP
                      // })
                  
                      /**
                       * 第二种的第二种写法，更加简洁
                       */
                      this.setState(produce(draftState => {
                        draftState.p.a++
                      }))
                    }`}
                </pre>
              </div>
            </div>
          </div>
        </div>
        <Com1 a={this.state.p.a}/>
        <Com2 b={this.state.p.b} />
        <Com3 c={this.state.p.c} />
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <button onClick={this.handleChange1}>方法 1: 点击改变父组件的状态使得 a 自增 1</button>
          <button onClick={this.handleChange2}>方法 2: 点击改变父组件的状态使得 a 自增 1</button>
        </div>
        <div>
          测试结果:
           <ol>
            <li>
              可以看到使用方法1, 我们只是改变了组件 1 接收的a，但是组件1 和组件 2 、组件 3 都发生重新渲染了，对于组件 2 ，我们只有在组件 2 使用 shouldComponentUpdate 或者 PureComponent 才能阻止组件 2 做不必要的重新渲染：
             <pre>{
              `
              shouldComponentUpdate(nextProps) {
                if (nextProps.b !== this.props.b) return true
                return false
              }`
              }
              </pre>
              对于组件 3，使用方法 1 会导致组件 3 重新渲染，因为方法 1 中 p.c 我们赋值了一个新的对象。组件 3 虽然使用了 PureComponent，但只是浅对比，对于引用类型的 props，虽然值一样，但是引用地址不同，所以重新渲染了。<br/>
              对比组件 2，如果我们在组件 2 中使用 PureComponent, 是不会让其重新渲染的，因为组件 2 接收的是一个基本类型的 props，浅比较确定前后是一个相同的 props，所以不用重新渲染。
            </li>
            <li>
              React 中，作为子组件的类组件如果不使用 PureComponent 或者 shouldComponentUpdate ，那么无论接收到的 props 是否改变，父组件每次重新渲染都会引起子组件重新渲染;
            </li>
            <li>
              使用 immer.js 的目的是，可以让父组件状态中的一些引用类型的数据的引用不变，从而让子组件可以不用深度递归比较新老 props 耗费性能，就可以通过浅对比引用来决定是否重新渲染。这样就减少了子组件对比 props 的计算量，提高性能。<br/>
              所以 immer.js 在 React 还是要配合浅对比来使用，比如 PureComponent 或者 shouldComponent 浅对比：
              <pre>
                {`
                  shouldComponentUpdate(nextProps) {
                    if (nextProps !== this.props) return true
                    return false
                  }
                `}
              </pre>
            </li>
           </ol>
        </div>
    </div>
    )
  }
}