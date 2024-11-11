import React from "react";
import '../CSS/item.css'

const ItemItemLibros = ({ image, name, author, editorial, isbn, categoria }) => {
    return (
        <div className='item'>
            <img className="item-image" src={image} alt="" />
            <p>{name}</p>
            <div className="item-prices">
                Autor:
                <div className="">
                    {author}

                </div>
              


            </div>
           
            
            <div className="item-prices">
            
            Editorial: 
                <div className="">
                    {editorial}

                </div>
            </div>

            <div className="item-prices">
            
           ISBN: 
                
            <div className="">
                    {isbn}

                </div>
            </div>
            <div className="item-prices">
            
            Categoria:
            <div className="">
                    {categoria}

                </div>
            </div>

        </div>
    )
}

export default ItemItemLibros;