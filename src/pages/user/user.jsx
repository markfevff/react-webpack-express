import React,{Component} from 'react';
import './user.scss';
class User extends Component {
    render() {
        console.log('User')
        return(
            <div className="user">
                <div className='bg bg1'>user</div>
            </div>
        )
    }
}
export default User;