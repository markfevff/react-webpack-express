import React, { Component,PureComponent,useState } from 'react';
import './index.scss';

/* 
    页面加载样式
*/
export default class Loading extends PureComponent{
    render() {
        return (
            <div className="at_loading">
                <span>加载中...</span>
            </div>
        )
    }
}