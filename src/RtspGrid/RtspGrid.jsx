import React from 'react';
import { MainLayout} from '../Styles/commonStyle';
import * as api from '../api/urlsApi';
import styled from 'styled-components';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

export const Li = styled.li`
display: block;
border: 2px #3b3b3b solid;
border-radius: 5px;
padding: 5px;
margin: 15px;
font-size: 20px;
cursor: pointer;
    &:hover {
        background-color: #424242;
    }
`;

class RtspGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urls: [],
            url: ''
        }
    }

    componentDidMount() {
        let userDetails = sessionStorage.getItem("userDetails");
        if(userDetails) {
            userDetails = JSON.parse(userDetails);
            this.getUrls(userDetails.userName);
        } else {
            const { history } = this.props;
            history.push('./');
        }
    }

    async getUrls(userName) {
        try {
            const urls = await api.getUrls(userName);
            this.setState({ urls: urls });
        }
        catch (e) {
            console.error(e);
        }
    }

    showUrls() {
        let urlsElements = [];
        this.state.urls.forEach(url => {
            const guid = uuid();
            urlsElements.push(<Li key={guid} onClick={() => { this.startStreaming(url) }}>{url}</Li>);
        });
        return urlsElements;
    }

    async startStreaming(url) {
        this.setState({ url: url });
        try {
            console.log('start streaming');
            // await api.startStreaming(url);
        }
        catch (e) {

        }
    }

    render() {
        return (
            <MainLayout>
                <h2>My Urls:</h2>
                <video id="test_video" controls autoPlay src={this.state.url}></video>
                <ul>
                    {this.state.urls.length > 0 ? this.showUrls() : ''}
                </ul>
            </MainLayout>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(RtspGrid);