import React from 'react';
import { MainLayout } from '../Styles/commonStyle';
import { Title, MainButton, MainButtons, Login, Register } from '../Styles/homeStyle';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleRoute(route) {
        const { history } = this.props;
        history.push(route) ;
    }

    render() {
        
        return (
            <MainLayout>
                <Title>AnyVision Exercise</Title>
                <MainButtons>
                    <Login>
                        <label onClick={() => { this.handleRoute('/login');}}>
                            <MainButton>
                                LOGIN
                            </MainButton>
                        </label>
                    </Login>
                    <Register>
                        <label onClick={() => { this.handleRoute('/register'); }}>
                            <MainButton>
                                REGISTER
                        </MainButton>
                        </label>
                    </Register>
                </MainButtons>
            </MainLayout>
        )
    }
}