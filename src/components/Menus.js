import React, { Component } from 'react';
import formatCurrency from "../util";
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

export default class Menus extends Component {
    constructor(props){
        super(props);
        this.state={
            menu: null,
        };
    }
    openModal = (menu) => {
        this.setState({menu});
    }
    closeModal =() =>{
        this.setState({menu: null});
    }
    render() {
        const { menu } = this.state;
        return (
            <div>
                <Fade bottom cascade={true}>
                <ul className="menus">
                    {this.props.menus.map(menu => (
                        <li key={menu._id}>
                            <div className="menu">
                                <a href={"#" + menu._id} onClick={()=> this.openModal(menu)}>
                                    <img src={menu.image} alt={menu.title}></img>
                                    <p>
                                        {menu.title}
                                    </p>
                                </a>
                                <div className="menu-price">
                                    <div>
                                        {formatCurrency(menu.price)}
                                    </div>
                                    <button onClick={()=> this.props.addToCart(menu)} className="button primary">
                                        Order
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                </Fade>
                {menu && (
                        <Modal isOpen={true}
                        onRequestClose={this.closeModal}>
                            
                            <Zoom>
                                <button className="close-modal" onClick={this.closeModal}>x</button>
                                <div className="menu-details">
                                    <img src={menu.image} alt={menu.title}></img>
                                    <div className="menu-details-description">
                                        <p>
                <strong>{menu.title}</strong>
                                        </p>
                                        <p>
                                            {menu.description}
                                        </p>
                                        <p>
                                            AvailableCusines{" "}
                                            {menu.availableflavour.map(x=>(
                                                <span>{" "} <button className="button">{x}</button></span>
                                            ))}
                                        </p>
                                        <div className="menu-price">
                                            <div>
                                                {formatCurrency(menu.price)}
                                            </div>
                                            <button className="button primary" onClick={()=>{
                                                this.props.addToCart(menu);
                                                // this.closeModal();
                                            }}>Order</button>
                                        </div>
                                    </div>
                                </div>
                            </Zoom>

                        </Modal>
                    )
                }
            </div>
        )
    }
}
