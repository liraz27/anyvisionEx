import React from 'react';
import { MainLayout, Input, ButtonText, ConfirmButton } from '../Styles/commonStyle';
import * as api from '../api/urlsApi';
import styled from 'styled-components';
import { connect } from 'react-redux';

export const WideInput = styled(Input)`
width: 40rem;
`;

class UserHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            userDetails: {}
        }
    }

    componentDidMount() {
        const userDetails = sessionStorage.getItem("userDetails");
        if(userDetails) {
            this.setState({userDetails: JSON.parse(userDetails)});
        } else {
            const { history } = this.props;
            history.push('./');
        }
    }

    handleTyping(event) {
        this.setState({ url: event.target.value });
    }

    async addUrl() {
        if (this.state.url.length > 0 && this.isValid(this.state.url)) {
            try {
                await api.addUrl(this.state.url, this.props.user.userName);
                this.setState({ url: '' });
                const { history } = this.props;
                history.push('./rtspGrid');
            }
            catch (e) {
                console.error(e);
            }
        }
    }

    isValid(url) {
        //todo: url validation
        return true;
    }

    render() {
        return (
            <MainLayout>
                <h4>Hey {this.props.user.fullName || this.state.userDetails.fullName},</h4>
                <WideInput placeholder="Enter url for RTSP stream" onChange={(e) => { this.handleTyping(e) }} ></WideInput>
                <ConfirmButton>
                    <ButtonText onClick={() => { this.addUrl() }}>ADD</ButtonText>
                </ConfirmButton>
            </MainLayout>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user
});
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(UserHomePage);