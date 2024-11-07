import React from "react";
import '../CSS/item.css'

const Item = ({ image, name, actor_1, actor_2, finalizado, temporadas, capitulos, plataforma, categoria }) => {
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
            Estado:
                <div className="">
                    
                    {finalizado ? 'Completa' : 'Incompleta'}

                </div>
            </div>
            <div className="item-prices">
                Temporadas:
                <div className="">
                    {temporadas}

                </div>
                
                
            </div>
            
            <div className="item-prices">
            
            Capitulos: 
                <div className="">
                    {capitulos}

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

export default Item;