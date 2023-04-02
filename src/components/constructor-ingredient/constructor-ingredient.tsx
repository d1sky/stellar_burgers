
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { TIngredientTypes } from '../../model/ingrediaents';
import styles from './constructor-ingredient.module.css';

type XYCoord = { x: number; y: number; }

const ConstructorIngredient: FC<{
    product: TIngredientTypes;
    index: number;
    moveElement: Function;
    handleClose: () => void;
}> = ({ product, index, moveElement, handleClose }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [{ handlerId }, drop] = useDrop({
        accept: 'constructorIngredient',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: any, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect: DOMRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset: XYCoord | null = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            moveElement({ dragIndex, hoverIndex })
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: 'constructorIngredient',
        item: () => {
            return { id: product.id, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    drag(drop(ref))

    return (
        <div
            ref={ref}
            data-handler-id={handlerId}
            className={`${styles.block} ${isDragging && styles.drag}`}>
            <div className={styles.mover}>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                key={product.id}
                text={product.name}
                price={product.price!}
                thumbnail={product.image!}
                handleClose={handleClose}
            />
        </div>
    )
}


export default ConstructorIngredient
