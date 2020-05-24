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
    umerHttpsApi() {
        // axios.post('/umerApi/wechat/getDoctorPsnInfo.do',qs.stringify({
        axios.post('https://api.umer.com.cn/healthchat/wechat/getDoctorPsnInfo.do',qs.stringify({
        // axios.post('/umerApi/wechat/getDoctorPsnInfo.do',qs.stringify({
            "token": 'umer0518',
            "umerId": '10866048'
        }),{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then(function (response) {
            console.log('umerHttpsApi-response',response);
          })
          .catch(function (error) {
            console.log('umerHttpsApi-error',error);
          });
    }
    umerHttpApiNoParameter() {
        axios.post('http://api.test.umer.com.cn/healthchat/ftf/hospitalAllList.do')
        .then(function (response) {
            console.log('umerHttpApiNoParameter-response',response);
          })
          .catch(function (error) {
            console.log('umerHttpApiNoParameter-error',error);
          });
    }
    umerHttpApiParameter() {
        axios.post('http://api.test.umer.com.cn/healthchat/ftf/consultListByUserNet.do',qs.stringify({
            netId: 'ouo-lwlv30k_Futd4ID8jXVBMLAA'
        }),{
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(function (response) {
            console.log('umerHttpApiParameter-response',response);
        })
        .catch(function (error) {
            console.log('umerHttpApiParameter-error',error);
        });
    }
    spApi() {
        axios.post('/spApi/api/web/login/qr/view')
        // axios.post('http://sp.online.umersoft.com:8910/shangdong-skin/api/web/login/qr/view')
        .then(function (response) {
            console.log('spApi-response',response);
        })
        .catch(function (error) {
            console.log('spApi-error',error);
        });
    }
    spApi1() {
        // axios.post('/spApi/api/web/login/status/view',qs.stringify({
        axios.post('http://sp.online.umersoft.com:8910/shangdong-skin/api/web/login/status/view',qs.stringify({
            code: 'e8d57f15-31f9-4a8c-83c2-9c12a0c258f5'
        }),{
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(function (response) {
            console.log('spApi-response',response);
        })
        .catch(function (error) {
            console.log('spApi-error',error);
        });
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
                <div onClick={() => store.dispatch(updateUserInfoId(2))}>更新userid</div>
                <Button onClick={this.umerHttpsApi.bind(this)}>umerHttps接口</Button>
                <Button onClick={this.umerHttpApiNoParameter.bind(this)}>umerHttp接口(无参数)</Button>
                <Button onClick={this.umerHttpApiParameter.bind(this)}>umerHttp接口(有参数)</Button>
                <Button onClick={this.spApi.bind(this)}>省皮接口1</Button>
                <Button onClick={this.spApi1.bind(this)}>省皮接口2</Button>
                <Button onClick={this.localApi.bind(this)}>本地接口</Button>
                <Button onClick={this.localUmerApi.bind(this)}>本地umer接口</Button>
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