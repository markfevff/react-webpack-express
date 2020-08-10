import React,{Component} from 'react';
import { connect } from 'react-redux';
import {compareCodeStr} from '@/utils/crypto'
class ArticleInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEncryptionRight: '',//加密是否正确
            mid: '8328',
            mt: '1596015573620',
            msn: 'pU4HpvBd3yNIGRowMezXjlnP1%2Fqa3kDrP5%2FgqTAyS0U%3D',
        }
    }
    componentDidMount() {
        let {mid,mt,msn} = this.state;
        let bo = compareCodeStr(mid + "-" + mt, msn)
        console.log('bo:',bo)
    }
    render() {
        return(
            <div>ArticleInfo1</div>
        )
    }
}

const mapStateToProps = state => {
    return{
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps)(ArticleInfo)