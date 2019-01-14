import React from 'react';
import {StaticRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './App.js';

export default (store, url, context)=>{
 return (
   <StaticRouter location={url} context={context}>
     <Provider store={store}>
       <App/>
     </Provider>
   </StaticRouter>
 )
}

