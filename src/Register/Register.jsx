import React from 'react';
import debounce from 'lodash/debounce';
import * as api from '../api/usersApi';
import { Password, UserName, RegisterForm } from '../Styles/registerStyle';
import { Input, MainLayout, ConfirmButton, ButtonText, ErrorMsg } from '../Styles/commonStyle';
import { userLoggedIn } from '../redux/actions/userActions';
import { connect } from 'react-redux';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            userName: '',
            password: '',
            isUserNameExist: false,
            errorMsg: ''
        }
    }

    handleTyping(event, stateName) {
        const stateValue = event.target.value;
        this.setState({ [stateName]: stateValue });

        if (stateName === 'userName') {
            this.checkValidUserName(stateValue);
            debounce(async () => { await this.checkValidUserName(stateValue) }, 3000);
        }
    }

    async checkValidUserName(userName) {
        try {
            const response = await api.checkUserNameValid(userName);
            this.setState({ isUserNameExist: response });
        } catch (e) {
            console.error(e);
            this.setState({ isUserNameExist: true });
        }

    }

    async register() {
        try {
            if (!this.state.isUserNameExist && this.state.userName.length !== 0 && this.state.password.length !== 0 && this.state.fullName.length !== 0) {
                await api.addUser(this.state.fullName, this.state.userName, this.state.password);
                const { history } = this.props;
                this.props.userLoggedIn(this.state.userName, this.state.fullName);
                this.setState({ userName: '', fullName: '', password: '' });
                sessionStorage.setItem("userDetailed", { userName: this.state.userName, fullName: this.state.fullName });
                history.push('./userHomePage');
            } else {
                this.setState({errorMsg: 'All fields are required'});
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <MainLayout>
                <h1>Registration</h1>
                <RegisterForm>
                    <div>
                        <Input placeholder="Full Name" value={this.state.fullName} onChange={(e) => { this.handleTyping(e, 'fullName') }}>
                        </Input>
                    </div>
                    <div>
                        <UserName spellcheck="false" redline={this.state.isUserNameExist} placeholder="User Name" value={this.state.userName} onChange={(e) => { this.handleTyping(e, 'userName') }}>
                        </UserName>
                    </div>
                    <div>
                        <Password type="password" placeholder="Password" value={this.state.password} onChange={(e) => { this.handleTyping(e, 'password') }}>
                        </Password>
                    </div>
                    <ConfirmButton>
                        <ButtonText onClick={() => this.register()}>Register</ButtonText>
                    </ConfirmButton>
                    <ErrorMsg>{this.state.errorMsg}</ErrorMsg>
                </RegisterForm>
            </MainLayout>


        )
    }
}

const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => ({
    userLoggedIn: (userName, fullName) => {
        dispatch(userLoggedIn(userName, fullName));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);