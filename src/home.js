import React,{Component} from 'react';
import {Button} from 'antd';
import axios from 'axios';
import { connect } from 'react-redux'
import qs from 'qs';
import store from '@/store/index'
import {updateUserInfoId} from '@/store/actions/user'
import avatar from '@/assets/images/avatar.png'
import beijing from '@/assets/images/beijing.png'
import '@/home.scss';
class Home extends Component {
    constructor(props) {
        super(props);
        console.log('props:',props)
        this.state = {
            left: 0,
            top: 0,
            newClientX: 0,
            newClientY: 0,
            toggleMove: false,
        }
        console.log('ss')
    }
    componentDidMount() {
        console.log('home-componentDidMount')
    }
    onmousedown(e) {
        // console.log('onmousedown-e:',e.target.style);
        const {left,top} = e.target.style;
        // console.log('left:',left,',top:',top,',clientX:',e.clientX)
        this.setState({
            left: parseFloat(left),
            top: parseFloat(top),
            newClientX: e.clientX,
            newClientY: e.clientY,
            toggleMove: true,
        })
    }
    onmousemove(e) {
        if(!this.state.toggleMove) return;
        // console.log('onmousemove')
        let {left,top,newClientX,newClientY} = this.state;
        let moveX = e.clientX - newClientX;
        let moveY = e.clientY - newClientY;
        left += moveX;
        top += moveY;
        this.setState({
            left,
            top,
            newClientX: e.clientX,
            newClientY: e.clientY,
        })
    }
    onmouseup() {
        this.setState({
            toggleMove: false,
        })
    }
    localApi() {
        // axios.post('/spApi/api/web/login/status/view',qs.stringify({
        axios.post('/testapi',{
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(function (response) {
            console.log('localApi-response',response);
        })
        .catch(function (error) {
            console.log('localApi-error',error);
        });
    }
    localUmerApi() {
        // axios.post('/spApi/api/web/login/status/view',qs.stringify({
        axios.post('/testUmerapi',{
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(function (response) {
            console.log('localApi-response',response);
        })
        .catch(function (error) {
            console.log('localApi-error',error);
        });
    }
    render() {
        const {left,top} = this.state;
        return(
            <div>
                {/* <div 
                    style={{
                        width: '100px',
                        height: '100px',
                        background: 'red',
                        position: 'absolute',
                        top: top + 'px',
                        left: left + 'px'
                    }}
                    onMouseDown = {this.onmousedown.bind(this)}
                    onMouseMove = {this.onmousemove.bind(this)}
                    onMouseUp = {this.onmouseup.bind(this)}
                    onMouseOut = {this.onmouseup.bind(this)}
                >
                    home
                </div> */}
                <div>home</div>
                <img src={avatar} alt=""/>
                <img src={beijing} alt=""/>
                <div className="bg"></div>
                <Button onClick={this.localApi.bind(this)}>本地接口</Button>
                <Button onClick={this.localUmerApi.bind(this)}>本地接口</Button>
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