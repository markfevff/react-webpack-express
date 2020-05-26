import React,{Component} from 'react';
class UserEdit extends Component {
    componentDidMount() {
        console.log('useredit-componentDidMount:',this.props.location)
    }
    render() {
        return(
            <div>user/edit</div>
        )
    }
}
export default UserEdit;