import React,{Component} from 'react';
import {AuthCompoent} from '@/hoc/loadableComponent';
import { connect } from 'react-redux';
class OrderEdit extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        console.log('OrderEdit-props:',this.props)
        console.log('location:',this.props.location)
        let search = this.props.location.search;
        let locationQuery = new URLSearchParams(search)
        let id = locationQuery.get('id')
        let key = locationQuery.get('key')
        let key2 = locationQuery.get('key2')
        console.log('id:',id,',key:',key,',key2:',key2)
        this.getOrder()
    }
    getOrder = () => {
        console.log('getOrder:')
    }
    render() {
        return(
            <div>order/edit {this.props.userInfo.openid}</div>
        )
    }
}

const mapStateToProps = state => {
    return{
        userInfo: state.userInfo
    }
}
// export default AuthCompoent(connect(mapStateToProps)(OrderEdit))

export default connect(mapStateToProps)(OrderEdit)