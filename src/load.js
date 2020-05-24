import React from 'react'
import Loadable from 'react-loadable'

function Loading(props) {
  console.log('Loading-props:',props)
    return <div>...加载中</div>
}

const LoadableComponent = component => {
  return Loadable({
    loader: component,
    loading: Loading,
    delay: 1000
  })
}

export default LoadableComponent