import React from "react";
import '../CSS/item.css'

const ItemItemLibros = ({ image, name, actor_1, actor_2, duracion, plataforma, categoria }) => {
    return (
        <div className='item'>
            <img className="item-image" src={image} alt="" />
            <p>{name}</p>
            <div className="item-prices">
                Actores:
                <div className="">
                    {actor_1}

                </div>
              
                <div className="">
                    {actor_2}

                </div>

            </div>
           
            
            <div className="item-prices">
            
            Duracion: 
                <div className="">
                    {duracion}

                </div>
            </div>

            <div className="item-prices">
            
           Plataforma: 
                
            <div className="">
                    {plataforma}

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