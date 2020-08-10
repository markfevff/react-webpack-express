import React,{Component} from 'react';
import { connect } from 'react-redux';
import {Button} from 'antd-mobile';
import './home.scss';
class Home extends Component {
    constructor(props) {
        super(props);
        console.log('props:',props)
        this.state = {
            
        }
    }
    componentDidMount() {
        console.log('home-componentDidMount:',this.props)
    }
    render() {
        return(
            <div>
                <div>home</div>
                <Button>你好</Button>
            </div> 
        )
    }
}

const mapStateToProps = state => {
    return{
        userInfo: state.userInfo
    }
}
export default connect(mapStateToProps)(Home)
// export default Home;