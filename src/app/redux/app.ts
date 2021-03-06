// app.ts

import * as _action from './app.actions';
import * as _ from 'lodash';
import { STORAGES } from '../interfas/sotarage';

let APP = dropt();
let data:any;
function dropt(){
  let data_stora:STORAGES = {};
  return data_stora;
}
export function appReducer(state: STORAGES = APP, action: _action.actions) {
  if(JSON.parse(localStorage.getItem('APP'))) {
    state = JSON.parse(localStorage.getItem('APP'));
    validacion_key(state);
  }
  else {
    localStorage.removeItem('APP');
    localStorage.setItem('APP', JSON.stringify(state));
  }
  // console.log(state);
  function local_Storage(APP){
    localStorage.removeItem('APP');
    localStorage.setItem('APP', JSON.stringify(APP));
    state = JSON.parse(localStorage.getItem('APP'));
    return state
  }
  function proceso_data(lista:any, data:any, opt){
    let idx = _.findIndex(lista, ['id', data.id]);
    if(idx >-1 && opt != 'post'){
      if(opt === 'delete') lista.splice(idx, 1);
      else lista[idx]= data;
    }else{
      if(opt === 'post') lista.push(data);
    }
    return lista;
  }
  function validacion_key(state: STORAGES){
    //if(!state.articulos) state.articulos = [];
    if(!state.persona) state.persona = {};
    if(!state.buscador) state.buscador = {};
    if(!state.menus) state.menus = [];
    if(!state.carrito) state.carrito = [];
  }
  switch (action.type) {
    case _action.PERSONA: {
      switch(action.opt) {
        case 'post' :
          if(!state.persona) state.persona = {};
            state.persona = action.payload;
            return local_Storage(state);
        break;
        case 'put': {
          state.persona = action.payload;
        }
        return local_Storage(state);
        break;
        case 'delete': 
          state.persona = {};
          return local_Storage(state);
        break;
        case 'drop': {
          state.persona = {};
          return local_Storage(state);
        }
        break;
      }
    }
    case _action.BUSCADOR: {
      switch(action.opt) {
        case 'post' :
          if(!state.buscador) state.buscador = {};
            state.buscador = action.payload;
            return local_Storage(state);
        break;
        case 'put': {
          state.buscador = action.payload;
        }
        return local_Storage(state);
        break;
        case 'delete': 
          console.log(action.opt)
          state.buscador = {};
          return local_Storage(state);
        break;
        case 'drop': {
          state.buscador = {};
          return local_Storage(state);
        }
        break;
      }
    }
    case _action.MENUS:{
      switch (action.opt){
        case 'post': {
          // console.log(action.payload);
          if(!state.menus) state.menus = [];
          data = proceso_data(state.menus,action.payload, 'post');
          state.menus = data;
          return local_Storage(state);
        }
        break;
        case 'put': {
          data = proceso_data(state.menus,action.payload, 'put');
          state.menus = data;
          return local_Storage(state);
        }
        break;
        case 'delete': {
          data = proceso_data(state.menus,action.payload, 'delete');
          state.menus = data;
          return local_Storage(state);
        }
        break;
        case 'drop': {
          state.menus = [];
          return local_Storage(state);
        }
        break;
        default:
        return local_Storage(state);
        break;
      }
    }
    case _action.CARRITO:{
      switch (action.opt){
        case 'post': {
          // console.log(action.payload);
          if(!state.carrito) state.carrito = [];
          data = proceso_data(state.carrito,action.payload, 'post');
          state.carrito = data;
          return local_Storage(state);
        }
        break;
        case 'put': {
          data = proceso_data(state.carrito,action.payload, 'put');
          state.carrito = data;
          return local_Storage(state);
        }
        break;
        case 'delete': {
          data = proceso_data(state.carrito,action.payload, 'delete');
          state.carrito = data;
          return local_Storage(state);
        }
        break;
        case 'drop': {
          state.carrito = [];
          return local_Storage(state);
        }
        break;
        default:
        return local_Storage(state);
        break;
      }
    }
    /*case _action.ARTICULOS:{
      switch (action.opt){
        case 'post': {
          // console.log(action.payload);
          if(!state.articulos) state.articulos = [];
          data = proceso_data(state.articulos,action.payload, 'post');
          state.articulos = data;
          return local_Storage(state);
        }
        break;
        case 'put': {
          data = proceso_data(state.articulos,action.payload, 'put');
          state.articulos = data;
          return local_Storage(state);
        }
        break;
        case 'delete': {
          data = proceso_data(state.articulos,action.payload, 'delete');
          state.articulos = data;
          return local_Storage(state);
        }
        break;
        case 'drop': {
          state.articulos = [];
          return local_Storage(state);
        }
        break;
        default:
        return local_Storage(state);
        break;
      }
    }
    break;*/
    default: return state;
  }
}
