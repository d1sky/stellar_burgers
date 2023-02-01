
import Card from '../card/Card';
import IngredientBlockStyle from './IngredientBlock.module.css';


const IngredientBlock = ({ name, data }) => {

    return (
        <div className={IngredientBlockStyle.block}>
            <div className={IngredientBlockStyle.block_title}>{name}</div>
            <div className={IngredientBlockStyle.block_container}>
                {data.map(it => <Card key={it.id} card={it} />)}
            </div>
        </div>
    );
}


export default IngredientBlock 