import React ,{Component} from 'react';
import Layout from './components/Layout/Layout';
import SaladBuilder from './containers/BurgerBuilder/BurgerBuilder';
class App extends Component {
  render(){
    return (
      <div >
        <Layout>
          <SaladBuilder/>
        </Layout>
      </div>
    );

  }
  
}

export default App;
