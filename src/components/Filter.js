import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        return (
            <div className="filter">
              <div className="filter-result">{this.props.count} Menus</div>
              <div className="filter-sort">Order{" "}
              <select value={this.props.size} onChange={this.props.sortMenus}>
                  <option>Latest</option>
                  <option value="lowest">Lowest</option>
                  <option value="highest">Highest</option>
                  
                      </select></div>
              <div className="filter-size">
                  Filter{" "}
                  <select value={this.props.size} onChange={this.props.filterMenus}>
                      <option value="">ALL</option>
                      <option value="mango">mango</option>
                      <option value="stawberry">stawberry</option>
                      <option value="pinapple">pinapple</option>
                      <option value="ChocoCake">ChocoCake</option>
                      <option value="Pancake">Pancake</option>
                 </select></div>
            </div>
        )
    }
}
