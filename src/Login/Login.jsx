import React from 'react';
import { MainLayout, Input, ButtonText, ConfirmButton, ErrorMsg } from '../Styles/commonStyle';
import { LoginForm, Password } from '../Styles/loginStyle';
import * as api from '../api/usersApi';
import { connect } from 'react-redux';
import { userLoggedIn } from '../redux/actions/userActions';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            errorMsg: '',
        }
    }

    handleTyping(event, stateName) {
        const stateValue = event.target.value;
        this.setState({ [stateName]: stateValue });
    }

    async login() {
        const userName = this.state.userName;
        const password = this.state.password;
        if (userName.length !== 0 && password.length !== 0) {
            try {
                const response = await api.login(userName, password);
                if (response) {
                    const { history } = this.props;
                    this.props.userLoggedIn(userName, response);
                    sessionStorage.setItem("userDetails", JSON.stringify({userName: userName, fullName: response}));
                    history.push('./userHomePage');
                }
                else {
                    this.setState({errorMsg: 'Login details are incorrect'});
                }
            }
            catch(e) {
                console.error(e);
                this.setState({errorMsg: 'Unexpected error occurred'});
            }
        } else {
            this.setState({errorMsg: 'All fields are required'});
        }
    }

    render() {
        return (
            <MainLayout>
                <LoginForm>
                    <div>
                        <Input placeholder="User Name" onChange={(e) => { this.handleTyping(e, 'userName') }}>
                        </Input>
                    </div>
                    <div>
                        <Password type="password" placeholder="Password" onChange={(e) => { this.handleTyping(e, 'password') }}>
                        </Password>
                    </div>
                    <ConfirmButton>
                        <ButtonText onClick={() => { this.login() }}>Login</ButtonText>
                    </ConfirmButton>
                    <ErrorMsg>{this.state.errorMsg}</ErrorMsg>
                </LoginForm>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);