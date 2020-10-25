import React ,{Component} from 'react';

import Model from '../../components/UI/Model/Model'
import Aux from '../../hoc/Aux';
const errorHandler = (WrappedComponent,axios) => {
    return class extends Component{
        state = {
            error: null
        }
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req =>{
                this.setState({error:null});
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error =>{
                this.setState({error:error});
            });
        }

        componentDidMount () {

            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirm = () => {
            this.setState({error:null})
        }
        render () {
            return (
                <Aux>
                    <Model 
                        show ={this.state.error}
                        modelClosed = {this.errorConfirm}>
                        {this.state.error? this.state.error.message:null}
                    </Model>
                    <WrappedComponent {...this.props}/>
                </Aux>
                
            );
        }
    }
};

export default errorHandler;